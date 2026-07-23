export function getThemeArchetype(theme) {
  switch (theme) {
    case 'nordic':
    case 'organic':
    case 'editorial':
      return 'minimalist';
    case 'cyberpunk':
    case 'futuristic':
    case 'bold':
      return 'futuristic';
    case 'luxury':
      return 'luxury';
    default:
      return 'classic';
  }
}
