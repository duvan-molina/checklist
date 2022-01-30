import React from "react";
import { useDropzone } from "react-dropzone";

function Uploader() {
  const [files, setFile] = React.useState([]);
  const [ids, setIds] = React.useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: React.useCallback((acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        // Si se llama una API para subir el archivo, se hace el request aquí
        Object.assign(
          {},
          {
            file,
            preview: URL.createObjectURL(file),
            id: crypto.randomUUID(),
          }
        )
      );
      setFile((prevFile) => [...prevFile, ...newFiles]);
      // setFile(newFiles[0]);
    }, []),
  });

  const handleDeleteFile = (id) => {
    setFile((prevFiles) => prevFiles.filter((file) => file.id !== id));
    // setFile({});
  };

  const handleClickEye = (id) => {
    const newArray = ids.includes(id)
      ? ids.filter((e) => e !== id)
      : ids.concat(id);
    setIds([...newArray]);
  };

  // React.useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  return (
    <section className="container uploader">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Upload files</p>
      </div>
      {files.length > 0 &&
        files.map((file) => (
          <div
            key={file.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                marginLeft: 25,
              }}
            >
              {file.file.name}
            </h2>
            {file.file.type.includes("image") && (
              <>
                <button
                  onClick={() => handleClickEye(file.id)}
                  style={{
                    marginLeft: 25,
                  }}
                >
                  {ids.includes(file.id) ? "Hide" : "Show"}
                </button>
                {ids.includes(file.id) && (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    style={{
                      marginLeft: 25,
                      width: "240px",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </>
            )}
            <a
              download={file.file.name}
              href={file.preview}
              style={{
                display: "block",
                marginLeft: 25,
              }}
            >
              Download
            </a>

            <button
              style={{
                marginLeft: 25,
              }}
              onClick={() => handleDeleteFile(file.id)}
            >
              delete
            </button>
          </div>
        ))}
    </section>
  );
}

export default Uploader;
