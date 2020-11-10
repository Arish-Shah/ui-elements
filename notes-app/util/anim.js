export const whenOpen = (noteX, noteY, noteWidth, finalWidth, finalHeight) => {
  const scale = noteWidth / finalWidth;
  const finalTop = (window.h - finalHeight) / 2;
  const finalLeft = (window.innerWidth - finalWidth) / 2;

  return `
    @keyframes move {
      from {
        transform: scale(${scale});
        transform-origin: 0% 0%;
        top: ${noteX}px;
        left: ${noteY}px;
      }

      to {
        transform: none;
        top: ${finalTop}px;
        left: ${finalLeft}px;
      }
    }
  `;
};

export const whenClose = (noteX, noteY, noteWidth, finalWidth, finalHeight) => {
  const scale = noteWidth / finalWidth;

  return `
    @keyframes move {
      from {
        transform: none;
        opacity: 1;
      }
      
      to {
        transform: scale(${scale});
        opacity: 0;
      }
    }
  `;
};
