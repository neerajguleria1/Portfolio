declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

class Analytics {
  private initialized = false;

  init(measurementId: string) {
    if (this.initialized) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    this.initialized = true;
  }

  trackPageView(path: string) {
    if (!window.gtag) return;
    window.gtag('config', import.meta.env.VITE_GA_ID, {
      page_path: path,
    });
  }

  trackEvent(action: string, category: string, label?: string, value?: number) {
    if (!window.gtag) return;
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  trackButtonClick(buttonName: string) {
    this.trackEvent('click', 'Button', buttonName);
  }

  trackFormSubmit(formName: string) {
    this.trackEvent('submit', 'Form', formName);
  }

  trackError(error: Error, context?: string) {
    this.trackEvent('error', 'Error', `${context}: ${error.message}`);
  }
}

export default new Analytics();
