import { UAParser } from 'ua-parser-js';
import FortNightConstants from './constants/fortnight-constants';

function getDimensions(height: number, width: number): string {
  return width.toString() + ' x ' + height.toString();
}

export function getBrowserHeight(): number {
  return window.innerHeight;
}

export function getBrowserWidth(): number {
  return window.innerWidth;
}

export function getBrowserSize(): string {
  const width: number = getBrowserWidth();
  const height: number = getBrowserHeight();

  return getDimensions(height, width);
}

export function getCurrentUrl(): string {
  return document.URL;
}

export function getDeviceType(): string {
  return navigator.platform;
}

export function getDomain(): string {
  return window.location.hostname;
}

export function getName(): string {
  return navigator.userAgent;
}

/* istanbul ignore next */
export function getOperatingSystem(): string {
  const parser: UAParser = new UAParser(getName());
  return parser.getOS().name;
}

export function getPreferredLanguage(): string {
  let preferredLanguage;
  const languages: readonly string[] = navigator.languages;
  if (languages && languages.length > 0) {
    preferredLanguage = languages[0];
  } else {
    preferredLanguage = navigator.language;
  }

  return preferredLanguage;
}

export function getScreenColorDepth(): string {
  let screenColorDepth: number = screen.colorDepth;

  return screenColorDepth.toString();
}

export function getScreenOrientation(): string {
  let screenOrientation: string;

  const windowHeight: number = getBrowserHeight();
  const windowWidth: number = getBrowserWidth();
  if (windowHeight > windowWidth) {
    screenOrientation = FortNightConstants.SO_PORTRAIT;
  } else if (windowHeight < windowWidth) {
    screenOrientation = FortNightConstants.SO_LANDSCAPE;
  } else {
    screenOrientation = FortNightConstants.SO_SQUARE;
  }

  return screenOrientation;
}

export function getScreenHeight(): number {
  return screen.height;
}

export function getScreenWidth(): number {
  return screen.width;
}

export function getScreenSize(): string {
  const width: number = getScreenWidth();
  const height: number = getScreenHeight();

  return getDimensions(height, width);
}

export function getSubDomain(): string {
  let domain: string, subdomain: string;

  domain = getDomain();
  if (domain.indexOf('.') !== -1) {
    subdomain = domain.split('.')[0];
  }

  return subdomain;
}

export function isCookiesDisabled(): boolean {
  return !navigator.cookieEnabled;
}