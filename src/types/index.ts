export interface Stand {
  name: string;
  latitude: number;
  longitude: number;
  image?: string;
}

export interface SiteSettings {
  site_name: string;
  background_color: string;
  background_image: string | null;
}
