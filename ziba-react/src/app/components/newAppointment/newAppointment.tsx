import { useContext, useEffect, useState } from 'react';
import { PDFReport } from '../pdfReport/pdfReport';
import './newAppointment.css';
import { pdf, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { UserContext } from '@/app/context/user.context';
import { getReportForAdmin, getReportForProf } from '@/app/services/Services';
interface props {
    role: string | undefined,
}

export const NewAppointment: React.FC<props> = ({ role }) => {
    const { userData } = useContext(UserContext);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getServicesProf = async () => {
        try {
            const id_user = userData?.id;
            const report2 = await getReportForProf(id_user);
            setReport(report2);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
            getServicesProf();
    }, []);  
    
    if (loading) {
        return <div>Loading...</div>;
    }

const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
    const now = new Date();
    const date = now.toLocaleDateString(undefined, options);

    const handleDownload = async () => {
        // crea una instancia del pdf con la ultima actualizacion
        const asPdf = pdf(<PDFReport info={report} role={role} />);
        
        try {
          // genera el blob del pdf
          const blob = await asPdf.toBlob();
          
          // crea un elemento link, setea un nombre de archivo a la propiedad download.
          // crea un object url para el blob, y desencadena el click en el link.
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `Reporte_Ganancias_${date}.pdf`;
          link.click();
          
          // limpia el object url
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Error generando PDF:', error);
        }
      };

    return (
        <div className="d-flex justify-content-evenly align-items-center client-appointment-button-container">
            {role == 'client' ? (
                <>
                    <p className='client-appointment-text'>¿No tiene turno todavía?</p>
                    <button className='client-appointment-button'>Reserve uno ahora</button>
                </>) : (
                <>
                    <p className='client-appointment-text'>Reporte de ganancias:</p>
                    <button className='client-appointment-button' onClick={handleDownload}>Descargar PDF<i className="bi bi-download icon-download"></i></button>
                </>)
            }

        </div>
    )
}