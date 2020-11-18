import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody } from '@david.kucsai/react-pdf-table'

import './ReportView.css'

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    row: {
        // flexDirection: 'row',
        // display: 'flex',
        // flexWrap: 'nowrap',
        marginBottom: 30,
    },
    store_name: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Times-Bold'
    },
    details_label: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Bold',
    },
    details_content: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Italic',
    },
    figures_header: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Bold'
    },
    figures_label: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'Times-Roman',
        borderBottom: true
    },
    figures_label_bottom: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: 'Times-Roman',
    },
    figures_content: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Italic',
        borderBottom: true
    },
    figures_content_bottom: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Italic'
    }
});


export default class ReportView extends Component {
    state = JSON.parse(localStorage.getItem('state'))

    Navigation = (props) => {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' href='/eodform'>Back</Button>
            </Navbar>
        )
    }

    totalFormatter(props) {
        let val

        if (props !== '') {
            val = '$' + props
        } else if (props === '' || props === '0.00') {
            val = '-'
        }

        return (val)
    }

    diffFormatter(props) {
        let val

        if (props > 0) {
            val = '$' + props
            val = '+' + val
        } else if (props < 0) {
            val = '$' + props
            val = val.slice(0, 1) + val.slice(2);
            val = '-' + val
        } else if (props === '0.00' || props === '') {
            val = '-'
        }

        return (val)
    }

    dayFetcher(props) {
        let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        let dateString = props;
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let day = weekDays[dateObject.getDay() - 1];

        return (day)
    }

    render() {
        return (
            <div>
                <this.Navigation />
                <div className='viewer-div'>
                    <PDFViewer className='viewer-window'>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                <Text style={styles.store_name}>Nextra Morayfield {this.state.store} News</Text>


                                <View style={styles.row}>
                                    <Table data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.details_label}>Day</TableCell>
                                            <TableCell style={styles.details_label}>Date</TableCell>
                                            <TableCell style={styles.details_label}>Staff</TableCell>
                                        </TableHeader>
                                        <TableBody>
                                            <TableCell style={styles.details_content}>{this.dayFetcher(this.state.date)}</TableCell>
                                            <TableCell style={styles.details_content}>{this.state.date}</TableCell>
                                            <TableCell style={styles.details_content}>{this.state.staff}</TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* Cash fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Cash</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Actual:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.cashActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.cashRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.cashDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* Eftpos fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Eftpos</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Actual:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.eftposActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.eftposRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.eftposDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* Lotto fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Lotto</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Lotto Report:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.lottoActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.lottoRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.lottoDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* ISI fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Instant Scratch-Its</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.isiDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* ePay fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>ePay</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Actual:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.epayActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.epayRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.epayDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* Lotto pay fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Lotto Payouts</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Lotto Report:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.lottoPayActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.lottoPayRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.lottoPayDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* ISI pay fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Instant Scratch-Its Payouts</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label}>Lotto Report:</Text>
                                                <Text style={styles.figures_label}>Register:</Text>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.isiPayActual)}</Text>
                                                <Text style={styles.figures_content}>{this.totalFormatter(this.state.isiPayRegister)}</Text>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.isiPayDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>

                                {/* Total difference fields */}
                                <View style={styles.row}>
                                    <Table style={styles.table} data={[{}]}>
                                        <TableHeader>
                                            <TableCell style={styles.figures_header}>Total Difference</TableCell>
                                        </TableHeader>
                                        <TableBody style={styles.table_cell}>
                                            <TableCell>
                                                <Text style={styles.figures_label_bottom}>Difference:</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text style={styles.figures_content_bottom}>{this.diffFormatter(this.state.totalDiff)}</Text>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </View>





                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            </div>

        )

    }
}