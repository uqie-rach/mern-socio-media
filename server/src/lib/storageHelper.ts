import { google } from "googleapis";
// const apikeys = require("../../apikeys.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];
import { Readable } from "stream";

async function authorize() {
  const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    undefined,
    process.env.PRIVATE_KEY,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

export default {
  uploadFile: async function (file: any, type: string, userId?: string,) {
    console.log("Uploading file to google drive....");
    const authClient = await authorize();
    console.log("Auth succeed");

    console.log('file in helper', file)

    return new Promise((resolve, reject) => {
      const drive = google.drive({ version: "v3", auth: authClient });

      const filename =
        userId +
        "_" +
        (type === "post" ? "post" : "profile") +
        "_" +
        new Date().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) +
        "_" +
        Math.floor(Math.random() * 1000);

      const fileMetaData = {
        name: filename,
        fields: "id",
      };

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      console.log(type === 'profile')

      const media = {
        mimeType: file.mimetype,
        body: bufferStream,
      };

      drive.files.create(
        {
          requestBody: {
            ...fileMetaData,
            parents: [
              (type === "post"
                ? process.env.DRIVE_POST_FOLDER_ID
                : type === 'profile' ? process.env.DRIVE_PROFILE_FOLDER_ID : '') || "",
            ],
          },
          media: media,
        },
        (err: any, file: any) => {
          console.log('response file', file)
          if (err) {
            console.log(err);
            reject(
              "Failed to upload file | An error occurred while uploading file"
            );
          } else {
            console.log("File uploaded successfully");

            // Set file permission to public
            drive.permissions.create(
              {
                fileId: file.data.id,
                requestBody: {
                  role: "reader",
                  type: "anyone",
                },
              },
              (err: any, permission: any) => {
                if (err) {
                  console.error("Failed to set file permission", err);
                  reject("Failed to set file permission");
                } else {
                  console.log("File permission set successfully");
                  resolve(file.data);
                }
              }
            );
          }
        }
      );
    });
  },
  updateFile: async function (
    file: any,
    userId: string,
    type: string,
    fileId: string
  ) {
    console.log("Updating file from google drive....");
    console.log("Auth succeed");

    if (!fileId) {
      return this.uploadFile(file, userId, type);
    } else {
      await this.deleteFile(fileId);
      return this.uploadFile(file, userId, type);
    }
  },
  deleteFile: async function (fileId: string) {
    console.log("Deleting file from google drive");
    const authClient = await authorize();
    console.log("Auth succeed");

    return new Promise((resolve, reject) => {
      const drive = google.drive({ version: "v3", auth: authClient });

      drive.files.delete(
        {
          fileId,
        },
        (err, file) => {
          if (err) {
            console.error(err);
            reject(
              "Failed to delete file | An error occured while deleting file"
            );
          } else {
            console.log("File deleted successfully");
            resolve(file?.data);
          }
        }
      );
    });
  },
};
