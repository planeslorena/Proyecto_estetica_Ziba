import './newAppointment.css';
import { usePDF, Document, Page } from '@react-pdf/renderer';
interface props {
    role: string | undefined,
}

export const NewAppointment: React.FC<props> = ({ role }) => {
    const report = (
        <Document>
          <Page>
            // My document data
          </Page>
        </Document>
      );

      const [instance, updateInstance] = usePDF({ document: report });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: 'error'</div>;

    return(
        <div className="d-flex justify-content-evenly align-items-center client-appointment-button-container">
            { role == 'client' ? (
                <>
                    <p className='client-appointment-text'>¿No tiene turno todavía?</p>
                    <button className='client-appointment-button'>Reserve uno ahora</button>
                </> ) : (
                <>
                    <p className='client-appointment-text'>Reporte de ganancias:</p>
                    <a href={instance.url?.toString()} download="test.pdf" className='client-appointment-button'> Download </a>
                </> )
            }
            
        </div>
    )
}