import * as browser from '../browser';

describe('browser', () => {
  let result;

  let windowSpy: any;
  let documentSpy: any;
  let navigatorSpy: any;
  let screenSpy: any;

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
    documentSpy = jest.spyOn(global, 'document', 'get');
    navigatorSpy = jest.spyOn(global, 'navigator', 'get');
    screenSpy = jest.spyOn(global, 'screen', 'get');

    windowSpy.mockImplementation(() => ({
      innerHeight: 100,
      innerWidth: 100,
      location: {
        hostname: 'github.com'
      }
    }));

    documentSpy.mockImplementation(() => ({
      URL: 'wwww.github.com'
    }));

    screenSpy.mockImplementation(() => ({
      colorDepth: 24,
      height: 100,
      width: 100
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
    documentSpy.mockRestore();
    navigatorSpy.mockRestore();
    screenSpy.mockRestore();
  });

  describe('getBrowserHeight', () => {
    it('should return browser height', () => {
      result = browser.getBrowserHeight();
      expect(result).toEqual(100);
    });
  });

  describe('getBrowserWidth', () => {
    it('should return browser width', () => {
      result = browser.getBrowserWidth();
      expect(result).toEqual(100);
    });
  });

  describe('getBrowserSize', () => {
    it('should return browser size', () => {
      result = browser.getBrowserSize();
      expect(result).toEqual('100 x 100');
    });
  });

  describe('getCurrentUrl', () => {
    it('should return current url', () => {
      result = browser.getCurrentUrl();
      expect(result).toEqual('wwww.github.com');
    });
  });

  describe('getDeviceType', () => {
    it('should return device type', () => {
      navigatorSpy.mockImplementation(() => ({
        platform: 'mac'
      }));

      result = browser.getDeviceType();
      expect(result).toEqual('mac');
    });
  });

  describe('getDomain', () => {
    it('should return domain', () => {
      result = browser.getDomain();
      expect(result).toEqual('github.com');
    });
  });

  describe('getName', () => {
    it('should return browser name', () => {
      navigatorSpy.mockImplementation(() => ({
        userAgent: 'Mozilla'
      }));

      result = browser.getName();
      expect(result).toEqual('Mozilla');
    });
  });

  describe('getPreferredLanguage', () => {
    it('should return preferred language from navigator languages', () => {
      navigatorSpy.mockImplementation(() => ({
        languages: ['english-US', 'english-UK']
      }));

      result = browser.getPreferredLanguage();
      expect(result).toEqual('english-US');
    });

    it('should return preferred language from navigator language', () => {
      navigatorSpy.mockImplementation(() => ({
        language: 'english-US'
      }));

      result = browser.getPreferredLanguage();
      expect(result).toEqual('english-US');
    });
  });

  describe('getScreenColorDepth', () => {
    it('should return screen color depth', () => {
      result = browser.getScreenColorDepth();
      expect(result).toEqual("24");
    });
  });

  describe('getScreenOrientation', () => {
    it('should return screen orientation as portrait if browser height is greater than browser width', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 200,
        innerWidth: 100,
      }));
      result = browser.getScreenOrientation();
      expect(result).toEqual("portrait");
    });

    it('should return screen orientation as landscape if browser height is less than browser width', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 100,
        innerWidth: 200,
      }));
      result = browser.getScreenOrientation();
      expect(result).toEqual("landscape");
    });

    it('should return screen orientation as square if browser height is equal to browser width', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 100,
        innerWidth: 100,
      }));
      result = browser.getScreenOrientation();
      expect(result).toEqual("square");
    });
  });

  describe('getScreenHeight', () => {
    it('should return screen height', () => {
      result = browser.getScreenHeight();
      expect(result).toEqual(100);
    });
  });

  describe('getScreenWidth', () => {
    it('should return screen width', () => {
      result = browser.getScreenWidth();
      expect(result).toEqual(100);
    });
  });

  describe('getScreenSize', () => {
    it('should return screen size', () => {
      result = browser.getScreenSize();
      expect(result).toEqual('100 x 100');
    });
  });

  describe('getSubDomain', () => {
    it('should return undefined if it is invalid', () => {
      windowSpy.mockImplementation(() => ({
        location: {
          hostname: ''
        }
      }));

      result = browser.getSubDomain();
      expect(result).toBeUndefined();
    });

    it('should return sub domain', () => {
      result = browser.getSubDomain();
      expect(result).toEqual('github');
    });
  });

  describe('isCookiesDisabled', () => {
    it('should return true if cookies are disabled', () => {
      navigatorSpy.mockImplementation(() => ({
        cookieEnabled: false
      }));

      result = browser.isCookiesDisabled();
      expect(result).toBeTruthy();
    });

    it('should return false if cookies are enabled', () => {
      navigatorSpy.mockImplementation(() => ({
        cookieEnabled: true
      }));

      result = browser.isCookiesDisabled();
      expect(result).toBeFalsy();
    });
  });
});