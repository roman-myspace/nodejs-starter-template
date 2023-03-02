const express = require("express");
const Models = require("../../../database/models")
const { formatBytes } = require("../../../utils/media");
const fs = require("fs");
const path = require("path");
const constents = require("../../../utils/constents");

async function uploadNew(req, res) {
    try {
        // console.log(req.fileValidationError)
        if (req.hasOwnProperty("fileValidationError")) {
            res.send({
                status: 300,
                message: "This file type is not supported"
            });
        } else {
            let fileData = req.file;
            var matches = fileData.filename.match(/^([^\\]*)\.(\w+)$/);
            let dirs = fileData.destination.split("/");
            let filePath = dirs[1] + "/" + fileData.filename;
            let size = formatBytes(fileData.size);

            let newFile = {
                filename: fileData.filename,
                name: matches[1],
                ext: matches[2],
                directory: fileData.destination,
                mime_type: fileData.mimetype,
                size: size,
                sizeInBytes: fileData.size,
                url: filePath
            };

            let media = await Models.Media(newFile).save();
            if (media && media._id) {
                res.send({
                    status: 200,
                    message: "File Uploaded Successfully",
                    file: media
                });
            } else {
                res.send({
                    status: 300,
                    message: "File Upload, but failed to save data"
                });
            }
        }
    } catch (error) {
        res.send({
            status: 400,
            message: "An Unknown error occured",
            error
        });
    }
}

async function listAllMediaFiles(req, res) {
    try {
        let media = await Models.Media.find({});
        if (Object.keys(media).length > 0) {
            res.send({
                status: 200,
                message: "All files retrived successfully",
                media
            });
        } else {
            res.send({
                status: 300,
                message: "Nothing Found!"
            });
        }

    } catch (error) {
        res.send({
            status: 400,
            message: "An Unknown error occured",
            error
        });
    }
}

async function getSpecificFile(req, res) {
    try {
        let { id } = req.body;
        let media = await Models.Media.findOne({ _id: id });
        if (media && media._id) {
            res.send({
                status: 200,
                message: "File Retrived Successfully",
                media
            });
        } else {
            res.send({
                status: 300,
                message: "No Such File Found"
            });
        }

    } catch (error) {
        res.send({
            status: 400,
            message: "An Unknown error occured",
            error
        });
    }
}

async function deleteFile(req, res) {
    try {
        let { id } = req.body;
        let specificFile = await Models.Media.findOne({ _id: id });
        if (specificFile && specificFile._id) {
            fs.unlink(`${constents.UPLOAD_DIR}/${specificFile.url}`, async function (error) {
                if (error) {
                    res.send({
                        status: 300,
                        message: "Failed to Delete File from Directory, Please try again",
                        error
                    });
                } else {
                    let media = await Models.Media.deleteOne({ _id: id });
                    if (media.deletedCount > 0) {
                        res.send({
                            status: 200,
                            message: "File Deleted Successfully"
                        });
                    } else {
                        res.send({
                            status: 300,
                            message: "No Such File Found"
                        });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            message: "An Unknown error occured",
            error
        });
    }
}


module.exports = {
    uploadNew,
    listAllMediaFiles,
    getSpecificFile,
    deleteFile
}