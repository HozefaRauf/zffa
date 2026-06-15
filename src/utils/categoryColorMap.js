export const CATEGORY_COLORS = {
  'store-front-signage': {
    badgeBg: '#FAECE7',
    badgeIcon: '#993C1D',
  },
  'windows-and-graphics': {
    badgeBg: '#E6F1FB',
    badgeIcon: '#185FA5',
  },
  'vehicle-branding': {
    badgeBg: '#fff1f2',
    badgeIcon: '#c11524',
  },
  'banners-and-large-format-printing': {
    badgeBg: '#FAEEDA',
    badgeIcon: '#854F0B',
  },
  'promotional-and-business-printing': {
    badgeBg: '#EAF3DE',
    badgeIcon: '#3B6D11',
  },
  'promotional-products': {
    badgeBg: '#EEEDFE',
    badgeIcon: '#3C3489',
  },
  'indoor-branding-and-displays': {
    badgeBg: '#E1F5EE',
    badgeIcon: '#0F6E56',
  },
  'digital-services': {
    badgeBg: '#F1EFE8',
    badgeIcon: '#444441',
  },
}

export const DEFAULT_COLORS = {
  badgeBg: '#F1EFE8',
  badgeIcon: '#444441',
}

export function getColors(categoryId) {
  return CATEGORY_COLORS[categoryId] ?? DEFAULT_COLORS
}
