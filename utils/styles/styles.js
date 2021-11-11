const styles = {
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#1F2128",
        padding: 24,
        paddingTop: 48
    },
    containerWithoutFlex: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#1F2128",
        padding: 24,
        paddingTop: 48
    },
    title: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff",
    },
    subTitle: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 18,
        color: "#9E9E9E",
        marginBottom: 72
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    section: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    orSection: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 16
    },
    border: {
        borderColor: '#2F2F2F',
        borderWidth: 1,
        width: "40%",
        marginTop: 16, 
    },
    label: {
        fontFamily: "Nunito-Regular",
        fontSize: 14,
        color: "#efefef",
        paddingBottom: 6,
        marginTop: 16
    },
    secondaryLabel: {
        fontFamily: "Nunito-Regular",
        fontSize: 12,
        color: "#9E9E9E", 
        textAlign: "center", 
        width: "100%",
        paddingBottom: 6,
        marginTop: 16
    },
    icon: {
        position: "absolute", 
        zIndex:999, 
        left: 12
    },
    textInput: {
        backgroundColor: "#363943",
        height: 55,
        alignSelf: "stretch",
        borderRadius: 6,
        paddingLeft: 48,
        width: "100%",
        color: "#fff"
    },
    
    ionIcon: {
        position: "absolute", 
        zIndex:999, 
        left: 24,
        top: 14,
    },
    btn: {
        backgroundColor: "#63D879",
        height: 60,
        borderRadius: 6,
        width: "100%",
        marginTop: 32
    },
    btnText: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 18,
        color: "#1F2128",
        textAlign: 'center',
        paddingTop: 16
    },
    linkedInBtn: {
        backgroundColor: "#21324B",
        height: 60,
        width: "100%",
        borderRadius: 6,
        marginTop: 32,
        marginRight: 12
    },
    linkedInBtnText: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 16,
        color: "#2867B2",
        textAlign: 'center',
        paddingTop: 18,
        paddingLeft: 32
    },
    googleBtn: {
        backgroundColor: "#572E38",
        height: 60,
        width: "100%",
        borderRadius: 6,
        marginTop: 32,
        marginLeft: 12,
    },
    googleBtnText: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 16,
        color: "#FF5566",
        textAlign: 'center',
        paddingTop: 18,
        paddingLeft: 32
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
      }
}

export default styles