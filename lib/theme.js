export function getThemeArchetype(theme) {
  switch (theme) {
    case 'nordic':
    case 'organic':
    case 'editorial':
    case 'home':
    case 'baby':
    case 'food':
      return 'minimalist';
    case 'cyberpunk':
    case 'futuristic':
    case 'bold':
    case 'digital':
    case 'auto':
    case 'services':
      return 'futuristic';
    case 'luxury':
    case 'jewelry':
    case 'beauty':
      return 'luxury';
    case 'apparel':
    case 'sports':
    case 'default':
    default:
      return 'classic';
  }
}
