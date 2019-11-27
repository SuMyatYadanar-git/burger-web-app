export default media => ({
    title: {
        height: '0px',
    },
    header: {
        fontSize:'1.8rem',
        // fontSize: fsc(media, 15) + 'px',
        fontWeight: '500',
        fontColor: '#a3a3a2',
        fontColorActive: '#737372',
        backgroundColor: 'transparent',
        height: '40px',
    },
    contextMenu: {
        backgroundColor: '#e3f2fd',
        fontSize: '18px',
        fontColor: 'rgba(0,0,0,.87)',
        transitionTime: '225ms',
    },
    rows: {
        // default || spaced
        spacing: 'default',
        fontSize:'1.5rem' ,
        // fontSize: fsc(media, 16) + 'px',
        fontColor: '#343434',
        backgroundColor: "white",
        borderWidth: '1px',
        borderColor: '#00000011',
        hoverFontColor: '#232323',
        hoverBackgroundColor: '#ffffffcc',
        height: '54px',
    },
    cells: {
        cellPadding: '40px',
    },
    expander: {
        fontColor: 'rgba(0,0,0,.87)',
        expanderColor: 'rgba(0,0,0,.54)',
        expanderColorDisabled: 'rgba(0,0,0,.12)',
        backgroundColor: 'transparent',
    },
    pagination: {
        fontSize: '14px',
        fontColor: 'rgba(0,0,0,.54)',
        backgroundColor: 'transparent',
        buttonFontColor: 'rgba(0,0,0,.54)',
        buttonHoverBackground: 'rgba(0,0,0,.12)',
    },
});