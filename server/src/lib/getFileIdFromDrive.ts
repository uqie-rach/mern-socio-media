export default function extractDriveId(url: string) {
    // Define the regex pattern to match the Google Drive ID
    const pattern = /(?:https:\/\/drive\.google\.com\/uc\?id=|https:\/\/drive\.google\.com\/file\/d\/|\/d\/|id=)([a-zA-Z0-9_-]{25,})/;
    const match = url.match(pattern);
    
    // If a match is found, return the ID, otherwise return null
    if (match) {
        return match[1];
    } else {
        return null;
    }
}