'use client'

import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';

const styles = StyleSheet.create({
    page: {
        padding: 34, // ~12mm
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#222",
        lineHeight: 1.4,
    },

    header: {
        marginBottom: 14,
    },

    h1: {
        fontSize: 22,
        fontWeight: 600,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 11,
        color: "#555",
        marginBottom: 6,
    },

    contact: {
        fontSize: 10,
        color: "#333",
    },

    section: {
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 3,
    },

    item: {
        marginBottom: 8,
    },

    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },

    title: {
        fontWeight: 600,
        fontSize: 11,
    },

    date: {
        fontSize: 10,
        color: "#666",
    },

    ul: {
        marginLeft: 10,
    },

    li: {
        fontSize: 10,
        marginBottom: 2,
    },

    text: {
        fontSize: 10,
    },

    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },

    skill: {
        fontSize: 10,
        marginRight: 10,
        marginBottom: 4,
    },
});

export default function PDFCV() {
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    if (aboutMe.loading) return null;

    return (
        <PDFViewer className='w-full h-full' showToolbar={false}>
            <Document>
                <Page size="A4" style={styles.page}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.h1}>John Doe</Text>
                        <Text style={styles.subtitle}>Software Engineer</Text>
                        <Text style={styles.contact}>
                            john@example.com • +1 555 123 4567 • City, Country • linkedin.com/in/johndoe
                        </Text>
                    </View>

                    {/* PROFILE */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profile</Text>
                        <Text>{aboutMe.data?.markdown}</Text>
                        {/*<Text style={styles.text}>
                            Software engineer with 5+ years of experience building web applications,
                            APIs, and internal tools. Focused on clean architecture, performance,
                            and user-centered development.
                        </Text>*/}
                    </View>

                    {/* EXPERIENCE */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>

                        <View style={styles.item}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.title}>
                                    Senior Software Engineer — Company Name
                                </Text>
                                <Text style={styles.date}>2022–Present</Text>
                            </View>
                            <View style={styles.ul}>
                                <Text style={styles.li}>• Built and maintained scalable web applications.</Text>
                                <Text style={styles.li}>• Improved performance and deployment workflows.</Text>
                                <Text style={styles.li}>• Mentored junior developers.</Text>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.title}>
                                    Software Engineer — Previous Company
                                </Text>
                                <Text style={styles.date}>2019–2022</Text>
                            </View>
                            <View style={styles.ul}>
                                <Text style={styles.li}>• Developed REST APIs and frontend features.</Text>
                                <Text style={styles.li}>• Collaborated with product and design teams.</Text>
                            </View>
                        </View>
                    </View>

                    {/* EDUCATION */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>

                        <View style={styles.item}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.title}>B.Sc. Computer Science</Text>
                                <Text style={styles.date}>2015–2019</Text>
                            </View>
                            <Text style={styles.text}>University Name</Text>
                        </View>
                    </View>

                    {/* SKILLS */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>

                        <View style={styles.skillsWrap}>
                            <Text style={styles.skill}>JavaScript</Text>
                            <Text style={styles.skill}>TypeScript</Text>
                            <Text style={styles.skill}>React</Text>
                            <Text style={styles.skill}>Node.js</Text>
                            <Text style={styles.skill}>PostgreSQL</Text>
                            <Text style={styles.skill}>Docker</Text>
                            <Text style={styles.skill}>AWS</Text>
                            <Text style={styles.skill}>Git</Text>
                        </View>
                    </View>

                </Page>
            </Document>
        </PDFViewer>
    );
}