import { ChangeEvent, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import agent from "../api/agent";

export default function Upload() {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    //const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
    const [progress, setProgress] = useState(0);

    const [progressInfos, setProgressInfos] = useState<any[]>([]);

    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        setSelectedFiles(files);
    };

    // const uploadSingleFile = () => {
    //     if (selectedFiles) {
    //         let currentFile = selectedFiles[0];
    //         setProgress(0);

    //         let formData = new FormData();
    //         formData.append('files', currentFile)

    //         agent.Files.uploadFiles(formData, (event: any) => {
    //             setProgress(Math.round((100 * event.loaded) / event.total));
    //         });
    //     }
    // };

    const uploadMultyFile = () => {
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                tienHanhUpload(i, selectedFiles[i]);
            }
        }
    }

    const tienHanhUpload = (index: number, file: File) => {
        if (file) {
            progressInfos[index] = { value: 0, fileName: file.name };
            setProgressInfos(progressInfos);

            let formData = new FormData();
            formData.append('files', file)

            agent.Files.uploadFiles(formData, (event: any) => {
                progressInfos[index].value = Math.round(100 * event.loaded / event.total);
                setProgress(progressInfos[index]);
            });
        }
    }

    return (
        <>
            <label className="btn btn-default">
                <input type="file" multiple onChange={selectFile} />
            </label>
            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={uploadMultyFile}
            >
                Upload
            </button>

            <Card style={{ width: '22rem' }}>
                {progressInfos.map((item, index) => (
                    <div key={index}>
                        <Card.Body>
                            <Card.Title>{item.fileName}</Card.Title>
                        </Card.Body>
                        <ProgressBar now={item.value} label={`${item.value}%`} />
                    </div>
                ))}
            </Card>
        </>
    );
}