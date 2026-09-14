export function handleSlashes(input: string): string[] {
    // Normalize regeltyp to remove leading slash if present, then split
    // Handles both 'regel/rtf-manuell' and '/regel/rtf-manuell' 
    const normalizedRegeltyp = input.startsWith('/') ? input.slice(1) : input;
    const parts = normalizedRegeltyp.split('/');
    return parts;
}