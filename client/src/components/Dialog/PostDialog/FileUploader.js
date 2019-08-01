import React, { Fragment } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

// Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
);

const FileUploader = ({ onUploadImages, files }) => {
    return (
        <Fragment>
            <FilePond
                files={files}
                allowMultiple
                maxFiles={5}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                labelIdle='Drag and drop or Click to upload. Use high-quality jpg files less than 32mb.'
                maxFileSize='32MB'
                onupdatefiles={fileItems => onUploadImages(fileItems)}
                dropValidation
            />
        </Fragment>
    );
};

export default FileUploader;
