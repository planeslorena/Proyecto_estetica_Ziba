import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'Montserrat', src: 'http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf' });

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    flexDirection: 'column',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  address: {
    flexDirection: 'column',
    marginTop: 36,
    marginBottom: 20,
    alignItems: 'flex-end'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderColor: '#594545',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#594545',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableCellAlt: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: '#815B5B',
    color: 'white',
  },
  tableFooter: {
    backgroundColor: '#B89898',
    borderTopWidth: 1,
    borderColor: '#594545',
    borderTopStyle: 'solid',
    color: 'white',
  },
  borderBottom: {
    borderBottom: 1,
    borderColor: '#594545',
  },
  colorAlt: {
    backgroundColor: '#F4F3ED'
  },
  profInfo: {
    marginBottom: 10,
  }
});

interface props {
  info: any[],
  role: any,
}

export const PDFReport: React.FC<props> = ({ info, role }) => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };



  const total = info.reduce((sum: any, item: any) => sum + item.price, 0);

  const groupedData = info.reduce((acc: any, item: any) => {
    if (!acc[item.professional]) {
      acc[item.professional] = {
        speciality: item.speciality,
        services: [],
        totalProfit: 0,
      };
    }
    acc[item.professional].services.push(item);
    acc[item.professional].totalProfit += item.profits;
    return acc;
  }, {});


  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.address}>
          <Image src='imagenes/logoziba-small.png' style={styles.logo}></Image>
          <Text>ZIBÁ - Centro de estética</Text>
          <Text>Gral. Paz 2811</Text>
          <Text>Fecha: {date.toLocaleDateString(undefined, options)}</Text>
        </View>
        {role == 'prof' && info.length > 0 && (
            <View style={styles.profInfo} key={info[0].id}>
              <Text>Prof. {info[0].professional}</Text>
              <Text>+15 0{info[0].phone}</Text>
              <Text>{info[0].mail}</Text>
            </View>
          )
        }
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>Especialidad</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>Servicio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>Precio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>Ganancias</Text>
            </View>
          </View>
          {/* Table Content */}
          {info.map((item: any, index: number) => (
            <View style={[
              styles.tableRow,
              index % 2 === 0 ? styles.colorAlt : { backgroundColor: 'transparent'},
            ]} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              {role == 'prof' ? (
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.speciality}</Text>
                </View>) : (
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.speciality}</Text>
                  <Text style={styles.tableCell}>Prof. {item.professional}</Text>
                </View>
              )}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.service}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.profits}</Text>
              </View>
            </View>
          ))}
          {/* Table Footer */}
          <View style={[styles.tableRow, styles.tableFooter]}>
            <View style={[styles.tableCol, { flex: 4, alignItems: 'flex-end'}]}>
              <Text style={styles.tableCellAlt}>Total: </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellAlt}>$ {total}</Text>
            </View>
          </View>
        </View>

        {role == 'admin' && Object.keys(groupedData).map(professional => (
          <View key={professional} style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader, styles.borderBottom]}>
              <Text style={styles.tableCellAlt}>{groupedData[professional].speciality} - Prof. {professional}</Text>
            </View>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellAlt}>ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellAlt}>Servicio</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellAlt}>Precio</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellAlt}>Ganancias</Text>
              </View>
            </View>
            {groupedData[professional].services.map((service: any, index: number) => (
              <View style={[
                styles.tableRow,
                index % 2 === 0 ? styles.colorAlt : { backgroundColor: 'transparent'},
              ]} key={service.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{service.service}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{service.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{service.profits}</Text>
                </View>
              </View>
            ))}
            <View style={[styles.tableRow, styles.tableFooter]}>
              <View style={[styles.tableCol, { flex: 3, alignItems: 'flex-end'}]}>
                <Text style={styles.tableCellAlt}>Total: </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellAlt}>$ {groupedData[professional].totalProfit}</Text>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
};