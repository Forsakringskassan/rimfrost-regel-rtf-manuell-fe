export interface GetDataResponse {
  handlaggning_id: string;
  kund: Kund;
  ersattningar: Ersattningar[];
}

export interface PatchDataRequest {
  ersattningId: string;
  beslutsutfall: Beslutsutfall;
  avslagsanledning?: string | null;
  signera: boolean;
}

export interface Kund {
  fornamn: string;
  efternamn: string;
  kon: KonEnum;
  anstallning: Anstallning;
}

export interface KundData {
  handlaggning_id: string;
  kund: Kund;
  ersattningar: Ersattningar[];
}

export interface Anstallning {
  anstallningsdag: string;
  arbetstid_procent: number;
  sista_anstallningsdag?: string | null;
  organisationsnamn: string;
  organisationsnummer: string;
}

export interface Ersattningar {
  ersattning_id: string;
  ersattningstyp: string;
  omfattning_procent: number;
  belopp: number;
  berakningsgrund: number;
  beslutsutfall?: Beslutsutfall | null;
  from: string;
  tom: string;
  avslagsanledning?: string | null;
}

export const KonEnum = {
  MAN: "MAN",
  KVINNA: "KVINNA",
};

export const Beslutsutfall = {
  JA: "JA",
  NEJ: "NEJ",
  FU: "FU",
};

export type KonEnum = (typeof KonEnum)[keyof typeof KonEnum];
export type Beslutsutfall = (typeof Beslutsutfall)[keyof typeof Beslutsutfall];
