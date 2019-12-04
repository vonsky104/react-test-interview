function generateIdFromBandAndAlbum (band: string, album: string) {
    const combinedName = `${band}-${album}`;
    return combinedName.toLowerCase().trim().replace(/\s/g, '-');
}

export { generateIdFromBandAndAlbum };
