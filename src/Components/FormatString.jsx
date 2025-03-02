import React from 'react';

function FormatAndDisplayString({ inputString }) {
  const formatString = (str) => {
    const lines = str.split('\n');
    const data = {};
    let currentSection = null;
    
    lines.forEach((line) => {
      line = line.trim();
      
      if (line.endsWith(':') && !line.startsWith(" ")) {
        // Store the original section name with spaces preserved
        const sectionKey = line.slice(0, -1);
        // Create a normalized version (lowercase, no spaces) for use as an object key
        const normalizedKey = sectionKey.toLowerCase().replace(/\s+/g, '_');
        currentSection = normalizedKey;
        data[currentSection] = {
          // Store the original display name to preserve spaces
          _displayName: sectionKey
        };
      } else if (currentSection && line !== '') {
        if (typeof data[currentSection] === 'object' && !Array.isArray(data[currentSection])) {
          if (line.includes(":")) {
            const parts = line.split(':');
            if (parts.length === 2) {
              // Preserve spaces in keys by using a normalized version as the object key
              const displayKey = parts[0].trim();
              const normalizedKey = displayKey.toLowerCase().replace(/\s+/g, '_');
              const value = parts[1].trim();
              
              // Store both the normalized key (for access) and display key (for rendering)
              data[currentSection][normalizedKey] = {
                displayName: displayKey,
                value: value
              };
            }
          } else if(typeof data[currentSection] === 'object' && 
                    Object.keys(data[currentSection]).length === 1 && 
                    '_displayName' in data[currentSection]) {
            // If section has no properties yet (just _displayName), set content as text
            data[currentSection].content = line;
          } else if ('content' in data[currentSection]) {
            // Append to existing content
            data[currentSection].content += " " + line;
          }
        }
      } else if (!currentSection && line !=="") {
        if (Object.keys(data).length === 0){
          data.title = line;
        } else if (Object.keys(data).length === 1 && typeof data.title === "string"){
          data.description = line;
        }
      }
    });
    
    return data;
  };

  const formattedData = formatString(inputString);
  
  return (
    <div className="bg-green-50 p-4 font-sans text-gray-800 max-w-full box-border break-words">
      {formattedData.title && (
        <h1 className="text-green-700 text-2xl md:text-3xl lg:text-4xl font-bold my-3">
          {formattedData.title}
        </h1>
      )}
      
      {formattedData.description && (
        <p className="text-base md:text-lg leading-relaxed mb-4">
          {formattedData.description}
        </p>
      )}
      
      {Object.keys(formattedData).map((key) => {
        if (key !== 'title' && key !== 'description') {
          const section = formattedData[key];
          // Use the original display name with preserved spaces
          const displayName = section._displayName || key;
          
          return (
            <div key={key} className="mt-6">
              <h2 className="text-green-700 text-xl md:text-2xl font-semibold mb-3">
                {displayName}
              </h2>
              
              {section.content ? (
                <p className="text-sm md:text-base leading-relaxed">
                  {section.content}
                </p>
              ) : (
                <ul className="bg-green-100 p-3 rounded-md list-inside m-0">
                  {Object.keys(section).filter(k => k !== '_displayName').map((subKey) => {
                    // Skip internal properties
                    if (subKey === '_displayName') return null;
                    
                    const item = section[subKey];
                    // Use original display name with spaces
                    const subKeyDisplay = item.displayName || subKey;
                    
                    return (
                      <li key={subKey} className="mb-2 text-sm md:text-base leading-relaxed">
                        <span className="font-bold">{subKeyDisplay}:</span>{' '}
                        <span className="inline">
                          {item.value || item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default FormatAndDisplayString;