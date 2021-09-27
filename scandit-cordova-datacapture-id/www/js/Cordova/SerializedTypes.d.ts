/// <amd-module name="scandit-cordova-datacapture-id.SerializedTypes" />
export interface DateResultJSON {
    day: number;
    month: number;
    year: number;
}
export interface ProfessionalDrivingPermitJSON {
    dateOfExpiry: DateResultJSON;
    codes: string[];
}
export interface VehicleRestrictionJSON {
    vehicleCode: string;
    vehicleRestriction: string;
    dateOfIssue: DateResultJSON;
}
export interface ImageInfoJSON {
    face: string;
    idFront: string;
    idBack: string;
}
export interface CapturedIdJSON {
    capturedResultType: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string;
    sex: string | null;
    dateOfBirth: DateResultJSON | null;
    nationality: string | null;
    address: string | null;
    documentType: string;
    issuingCountryIso: string | null;
    issuingCountry: string | null;
    documentNumber: string | null;
    dateOfExpiry: DateResultJSON | null;
    dateOfIssue: DateResultJSON | null;
    imageInfo: ImageInfoJSON | null;
    aamvaBarcodeResult: AAMVABarcodeResultJSON | null;
    argentinaIdBarcodeResult: ArgentinaIdBarcodeResultJSON | null;
    colombiaIdBarcodeResult: ColombiaIdBarcodeResultJSON | null;
    mrzResult: MRZResultJSON | null;
    southAfricaDlBarcodeResult: SouthAfricaDlBarcodeResultJSON | null;
    southAfricaIdBarcodeResult: SouthAfricaIdBarcodeResultJSON | null;
    usUniformedServicesBarcodeResult: USUniformedServicesBarcodeResultJSON | null;
    vizResult: VIZResultJSON | null;
}
export interface AAMVABarcodeResultJSON {
    aamvaVersion: number;
    aliasFamilyName: string | null;
    aliasGivenName: string | null;
    aliasSuffixName: string | null;
    cardRevisionDate: DateResultJSON | null;
    documentDiscriminatorNumber: string | null;
    driverNamePrefix: string | null;
    driverNameSuffix: string | null;
    endorsementsCode: string | null;
    eyeColor: string | null;
    firstNameTruncation: string | null;
    hairColor: string | null;
    heightCm: number | null;
    heightInch: number | null;
    iin: string;
    issuingJurisdiction: string;
    issuingJurisdictionIso: string;
    jurisdictionVersion: number;
    lastNameTruncation: string | null;
    middleName: string | null;
    middleNameTruncation: string | null;
    placeOfBirth: string | null;
    race: string | null;
    restrictionsCode: string | null;
    vehicleClass: string | null;
    weightKg: number | null;
    weightLbs: number | null;
    barcodeDataElements: {
        [key: string]: string;
    };
}
export interface ArgentinaIdBarcodeResultJSON {
    documentCopy: string;
    personalIdNumber: string;
}
export interface ColombiaIdBarcodeResultJSON {
    bloodType: string;
}
export interface MRZResultJSON {
    documentCode: string;
    namesAreTruncated: boolean;
    optional: string | null;
    optional1: string | null;
    capturedMrz: string;
}
export interface SouthAfricaDlBarcodeResultJSON {
    version: number;
    licenseCountryOfIssue: string;
    personalIdNumber: string;
    personalIdNumberType: string;
    documentCopy: number;
    driverRestrictionCodes: number[];
    professionalDrivingPermit: ProfessionalDrivingPermitJSON | null;
    vehicleRestrictions: VehicleRestrictionJSON[];
}
export interface SouthAfricaIdBarcodeResultJSON {
    countryOfBirth: string;
    countryOfBirthIso: string;
    citizenshipStatus: string;
    personalIdNumber: string;
}
export interface USUniformedServicesBarcodeResultJSON {
    bloodType: string | null;
    branchOfService: string;
    champusEffectiveDate: DateResultJSON | null;
    champusExpiryDate: DateResultJSON | null;
    civilianHealthCareFlagCode: string;
    civilianHealthCareFlagDescription: string;
    commissaryFlagCode: string;
    commissaryFlagDescription: string;
    deersDependentSuffixCode: number;
    deersDependentSuffixDescription: string;
    directCareFlagCode: string;
    directCareFlagDescription: string;
    exchangeFlagCode: string;
    exchangeFlagDescription: string;
    eyeColor: string;
    familySequenceNumber: number;
    formNumber: string;
    genevaConventionCategory: string | null;
    hairColor: string;
    height: number;
    jpegData: string;
    mwrFlagCode: string;
    mwrFlagDescription: string;
    payGrade: string | null;
    personDesignatorDocument: number;
    rank: string;
    relationshipCode: string | null;
    relationshipDescription: string | null;
    securityCode: string;
    serviceCode: string;
    sponsorFlag: string;
    sponsorPersonDesignatorIdentifier: number | null;
    sponsorName: string | null;
    statusCode: string;
    statusCodeDescription: string;
    version: number;
    weight: number;
}
export interface VIZResultJSON {
    additionalAddressInformation: string | null;
    additionalNameInformation: string | null;
    documentAdditionalNumber: string | null;
    employer: string | null;
    issuingAuthority: string | null;
    issuingJurisdiction: string | null;
    maritalStatus: string | null;
    personalIdNumber: string | null;
    placeOfBirth: string | null;
    profession: string | null;
    race: string | null;
    religion: string | null;
    residentialStatus: string | null;
    capturedSides: string;
    isBackSideCaptureSupported: boolean;
}
export interface IdCaptureErrorJSON {
    type: string;
    message: string;
}
export interface IdCaptureSessionJSON {
    newlyCapturedId: CapturedIdJSON | null;
    frameSequenceId: number;
    error: IdCaptureErrorJSON;
}
