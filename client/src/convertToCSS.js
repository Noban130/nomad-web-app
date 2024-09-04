function convertToCSS(reactNativeObject) {
    let cssString = '';
  
    for (const className in reactNativeObject) {
        cssString += `.${className} {\n`;
    
        const styles = reactNativeObject[className];
        for (const prop in styles) {
            const value = styles[prop];
            const cssProp = prop.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
            cssString += `    ${cssProp}: ${value};\n`;
        }
    
        cssString += '}\n\n';
    }
  
    return cssString;
}

function convertStyleSheetToCSS(styleSheet) {
    let cssCode = '';
    
    function convertStyleObjectToCSS(styleObject, indentation = '') {
        Object.entries(styleObject).forEach(([className, style]) => {
            cssCode += `${indentation}.${className} {\n`;
            
            Object.entries(style).forEach(([property, value]) => {
                if (property === 'gap') {
                    cssCode += `${indentation}  column-gap: ${value}px;\n`;
                    cssCode += `${indentation}  row-gap: ${value}px;\n`;
                } else if (property === 'alignItems' || property === 'justifyContent') {
                    cssCode += `${indentation}  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
                } else if (property === 'paddingHorizontal') {
                    cssCode += `${indentation}  padding-left: ${value}px;\n`;
                    cssCode += `${indentation}  padding-right: ${value}px;\n`;
                } else if (property === 'paddingVertical') {
                    cssCode += `${indentation}  padding-top: ${value}px;\n`;
                    cssCode += `${indentation}  padding-bottom: ${value}px;\n`;
                } else if (property === 'resizeMode') {
                    cssCode += `${indentation}  object-fit: ${value};\n`;
                } else {
                    cssCode += `${indentation}  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
                }
            });
            
            cssCode += `${indentation}}\n\n`;
        });
    }
    
    convertStyleObjectToCSS(styleSheet);
    
    return cssCode;
}

export { convertToCSS, convertStyleSheetToCSS}