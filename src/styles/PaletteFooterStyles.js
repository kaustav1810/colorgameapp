import sizes from './sizes';

export default {
    PaletteFooter: {
      backgroundColor: "white",
      height: "5vh",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontWeight: "bold",
      [sizes.down('xs')]:{
        display:'none'
      }
    },
    emoji: {
      fontSize: "1.5rem",
      margin: "0 1rem",
      [sizes.down('xs')]:{
        display:'none'
      }
    }
  };
  