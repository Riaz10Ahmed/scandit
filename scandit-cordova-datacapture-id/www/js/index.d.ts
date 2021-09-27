declare module Scandit {

interface PrivateDateResult {
    fromJSON(json: DateResultJSON | null): DateResult;
}
interface PrivateProfessionalDrivingPermit {
    fromJSON(json: ProfessionalDrivingPermitJSON | null): ProfessionalDrivingPermit;
}
interface PrivateVehicleRestriction {
    fromJSON(json: VehicleRestrictionJSON | null): VehicleRestriction;
}
interface PrivateAAMVABarcodeResult {
    fromJSON(json: AAMVABarcodeResultJSON): AAMVABarcodeResult;
}
interface PrivateArgentinaIdBarcodeResult {
    fromJSON(json: ArgentinaIdBarcodeResultJSON): ArgentinaIdBarcodeResult;
}
interface PrivateColombiaIdBarcodeResult {
    fromJSON(json: ColombiaIdBarcodeResultJSON): ColombiaIdBarcodeResult;
}
interface PrivateMRZResult {
    fromJSON(json: MRZResultJSON): MRZResult;
}
interface PrivateUSUniformedServicesBarcodeResult {
    fromJSON(json: USUniformedServicesBarcodeResultJSON): USUniformedServicesBarcodeResult;
}
interface PrivateVIZResult {
    fromJSON(json: VIZResultJSON): VIZResult;
}
interface PrivateSouthAfricaIdBarcodeResult {
    fromJSON(json: SouthAfricaIdBarcodeResultJSON): SouthAfricaIdBarcodeResult;
}
interface PrivateSouthAfricaDlBarcodeResult {
    fromJSON(json: SouthAfricaDlBarcodeResultJSON): SouthAfricaDlBarcodeResult;
}
interface PrivateCapturedId {
    fromJSON(json: CapturedIdJSON): CapturedId;
}
export class DateResult {
    private json;
    get day(): number;
    get month(): number;
    get year(): number;
    private static fromJSON;
}
export class ProfessionalDrivingPermit {
    private json;
    get dateOfExpiry(): DateResult;
    get codes(): string[];
    private static fromJSON;
}
export class VehicleRestriction {
    private json;
    get vehicleCode(): string;
    get vehicleRestriction(): string;
    get dateOfIssue(): DateResult;
    private static fromJSON;
}
export class CapturedId {
    private json;
    get firstName(): string | null;
    get lastName(): string | null;
    get fullName(): string;
    get sex(): string | null;
    get dateOfBirth(): DateResult | null;
    get nationality(): string | null;
    get address(): string | null;
    get capturedResultType(): CapturedResultType;
    get documentType(): DocumentType;
    get issuingCountryIso(): string | null;
    get issuingCountry(): string | null;
    get documentNumber(): string | null;
    get dateOfExpiry(): DateResult | null;
    get dateOfIssue(): DateResult | null;
    private _aamvaBarcodeResult;
    get aamvaBarcodeResult(): AAMVABarcodeResult | null;
    private _argentinaIdBarcodeResult;
    get argentinaIdBarcodeResult(): ArgentinaIdBarcodeResult | null;
    private _colombiaIdBarcodeResult;
    get colombiaIdBarcodeResult(): ColombiaIdBarcodeResult | null;
    private _mrzResult;
    get mrzResult(): MRZResult | null;
    private _southAfricaIdBarcodeResult;
    get southAfricaIdBarcodeResult(): SouthAfricaIdBarcodeResult | null;
    private _southAfricaDlBarcodeResult;
    get southAfricaDlBarcodeResult(): SouthAfricaDlBarcodeResult | null;
    private _usUniformedServicesBarcodeResult;
    get usUniformedServicesBarcodeResult(): USUniformedServicesBarcodeResult | null;
    private _vizResult;
    get vizResult(): VIZResult | null;
    private static fromJSON;
    idImageOfType(type: IdImageType): string | null;
}
export class AAMVABarcodeResult {
    private json;
    get aamvaVersion(): number;
    get aliasFamilyName(): string | null;
    get aliasGivenName(): string | null;
    get aliasSuffixName(): string | null;
    get driverNamePrefix(): string | null;
    get driverNameSuffix(): string | null;
    get endorsementsCode(): string | null;
    get eyeColor(): string | null;
    get firstNameTruncation(): string | null;
    get hairColor(): string | null;
    get heightCm(): number | null;
    get heightInch(): number | null;
    get iIN(): string;
    get issuingJurisdiction(): string;
    get issuingJurisdictionIso(): string;
    get jurisdictionVersion(): number;
    get lastNameTruncation(): string | null;
    get middleName(): string | null;
    get middleNameTruncation(): string | null;
    get placeOfBirth(): string | null;
    get race(): string | null;
    get restrictionsCode(): string | null;
    get vehicleClass(): string | null;
    get weightKg(): number | null;
    get weightLbs(): number | null;
    get cardRevisionDate(): DateResult | null;
    get documentDiscriminatorNumber(): string | null;
    get barcodeDataElements(): {
        [key: string]: string;
    };
    private static fromJSON;
}
export class MRZResult {
    private json;
    get documentCode(): string;
    get namesAreTruncated(): boolean;
    get optional(): string | null;
    get optional1(): string | null;
    get capturedMrz(): string;
    private static fromJSON;
}
export class USUniformedServicesBarcodeResult {
    private json;
    get bloodType(): string | null;
    get branchOfService(): string;
    get champusEffectiveDate(): DateResult | null;
    get champusExpiryDate(): DateResult | null;
    get civilianHealthCareFlagCode(): string;
    get civilianHealthCareFlagDescription(): string;
    get commissaryFlagCode(): string;
    get commissaryFlagDescription(): string;
    get deersDependentSuffixCode(): number;
    get deersDependentSuffixDescription(): string;
    get directCareFlagCode(): string;
    get directCareFlagDescription(): string;
    get exchangeFlagCode(): string;
    get exchangeFlagDescription(): string;
    get eyeColor(): string;
    get familySequenceNumber(): number;
    get formNumber(): string;
    get genevaConventionCategory(): string | null;
    get hairColor(): string;
    get height(): number;
    get jpegData(): string | null;
    get mwrFlagCode(): string;
    get mwrFlagDescription(): string;
    get payGrade(): string | null;
    get personDesignatorDocument(): number;
    get rank(): string;
    get relationshipCode(): string | null;
    get relationshipDescription(): string | null;
    get securityCode(): string;
    get serviceCode(): string;
    get sponsorFlag(): string;
    get sponsorName(): string | null;
    get sponsorPersonDesignatorIdentifier(): number | null;
    get statusCode(): string;
    get statusCodeDescription(): string;
    get version(): number;
    get weight(): number;
    private static fromJSON;
}
export class VIZResult {
    private json;
    get additionalAddressInformation(): string | null;
    get additionalNameInformation(): string | null;
    get documentAdditionalNumber(): string | null;
    get employer(): string | null;
    get issuingAuthority(): string | null;
    get issuingJurisdiction(): string | null;
    get maritalStatus(): string | null;
    get personalIdNumber(): string | null;
    get placeOfBirth(): string | null;
    get profession(): string | null;
    get race(): string | null;
    get religion(): string | null;
    get residentialStatus(): string | null;
    get capturedSides(): SupportedSides;
    get isBackSideCaptureSupported(): boolean;
    private static fromJSON;
}
export class ArgentinaIdBarcodeResult {
    private json;
    get personalIdNumber(): string;
    get documentCopy(): string;
    private static fromJSON;
}
export class ColombiaIdBarcodeResult {
    private json;
    get bloodType(): string;
    private static fromJSON;
}
export class SouthAfricaIdBarcodeResult {
    private json;
    get countryOfBirth(): string;
    get countryOfBirthIso(): string;
    get citizenshipStatus(): string;
    get personalIdNumber(): string;
    private static fromJSON;
}
export class SouthAfricaDlBarcodeResult {
    private json;
    get version(): number;
    get licenseCountryOfIssue(): string;
    get personalIdNumber(): string;
    get personalIdNumberType(): string;
    get documentCopy(): number;
    get driverRestrictionCodes(): number[];
    get professionalDrivingPermit(): ProfessionalDrivingPermit | null;
    get vehicleRestrictions(): VehicleRestriction[];
    private static fromJSON;
}


export enum CapturedResultType {
    AAMVABarcodeResult = "aamvaBarcodeResult",
    ArgentinaIdBarcodeResult = "argentinaIdBarcodeResult",
    ColombiaIdBarcodeResult = "colombiaIdBarcodeResult",
    MRZResult = "mrzResult",
    SouthAfricaDlBarcodeResult = "southAfricaDlBarcodeResult",
    SouthAfricaIdBarcodeResult = "southAfricaIdBarcodeResult",
    USUniformedServicesBarcodeResult = "usUniformedServicesBarcodeResult",
    VIZResult = "vizResult"
}
export enum DocumentType {
    None = "none",
    ConsularId = "consularId",
    DrivingLicense = "drivingLicense",
    DrivingLicensePublicServicesCard = "drivingLicensePublicServicesCard",
    EmploymentPass = "employmentPass",
    FinCard = "finCard",
    Id = "id",
    MultipurposeId = "multipurposeId",
    MyKad = "myKad",
    MyKid = "myKid",
    MyPR = "myPr",
    MyTentera = "myTentera",
    PanCard = "panCard",
    ProfessionalId = "professionalId",
    PublicServicesCard = "publicServicesCard",
    ResidencePermit = "residencePermit",
    ResidentId = "residentId",
    TemporaryResidencePermit = "temporaryResidencePermit",
    VoterId = "voterId",
    WorkPermit = "workPermit",
    IKad = "iKad",
    MilitaryId = "militaryId",
    MyKas = "myKas",
    SocialSecurityCard = "socialSecurityCard",
    HealthInsuranceCard = "healthInsuranceCard",
    Passport = "passport",
    Visa = "visa",
    SPass = "sPass",
    AddressCard = "addressCard",
    AlienId = "alienId",
    AlienPassport = "alienPassport",
    GreenCard = "greenCard",
    MinorsId = "minorsId",
    PostalId = "postalId",
    ProfessionalDl = "professionalDl",
    TaxId = "taxId",
    WeaponPermit = "weaponPermit",
    BorderCrossingCard = "borderCrossingCard",
    DriverCard = "driverCard",
    GlobalEntryCard = "globalEntryCard",
    MyPolis = "myPolis",
    NexusCard = "nexusCard",
    PassportCard = "passportCard",
    ProofOfAgeCard = "proofOfAgeCard",
    RefugeeId = "refugeeId",
    TribalId = "tribalId",
    VeteranId = "veteranId"
}
export enum IdDocumentType {
    AAMVABarcode = "aamvaBarcode",
    ArgentinaIdBarcode = "argentinaIdBarcode",
    ColombiaIdBarcode = "colombiaIdBarcode",
    DLVIZ = "dlViz",
    IdCardMRZ = "idCardMrz",
    IdCardVIZ = "idCardViz",
    PassportMRZ = "passportMrz",
    SouthAfricaDlBarcode = "southAfricaDlBarcode",
    SouthAfricaIdBarcode = "southAfricaIdBarcode",
    SwissDLMRZ = "swissDlMrz",
    USUSIdBarcode = "usUsIdBarcode",
    VisaMRZ = "visaMrz"
}
export enum SupportedSides {
    FrontOnly = "frontOnly",
    FrontAndBack = "frontAndBack"
}
export enum IdImageType {
    Face = "face",
    IdFront = "idFront",
    IdBack = "idBack"
}
export enum IdLayout {
    TD1 = "td1",
    TD2 = "td2",
    TD3 = "td3",
    MRVa = "mrvA",
    VIZ = "viz",
    PDF417 = "pdf417",
    Auto = "auto",
    None = "none"
}
export enum IdLayoutStyle {
    Rounded = "rounded",
    Square = "square"
}
export enum IdLayoutLineStyle {
    Light = "light",
    Bold = "bold"
}


interface PrivateIdCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class IdCapture implements DataCaptureMode {
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    static get recommendedCameraSettings(): CameraSettings;
    private type;
    private _isEnabled;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private proxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: IdCaptureSettings): IdCapture;
    addListener(listener: IdCaptureListener): void;
    removeListener(listener: IdCaptureListener): void;
    reset(): Promise<void>;
    private didChange;
}


interface PrivateIdCaptureSession {
    _error: IdCaptureError | null;
    fromJSON(json: IdCaptureSessionJSON): IdCaptureSession;
}
interface PrivateIdCaptureError {
    fromJSON(json: IdCaptureErrorJSON): IdCaptureError;
}
export class IdCaptureError {
    private _type;
    get type(): string;
    private _message;
    get message(): string;
    private static fromJSON;
}
export class IdCaptureSession {
    private _newlyCapturedId;
    get newlyCapturedId(): CapturedId | null;
    private _frameSequenceId;
    get frameSequenceId(): number;
    private _error;
    private static fromJSON;
}
export interface IdCaptureListener {
    didCaptureId?(idCapture: IdCapture, session: IdCaptureSession): void;
    didFailWithError?(idCapture: IdCapture, error: IdCaptureError, session: IdCaptureSession): void;
}
export class IdCaptureOverlay implements DataCaptureOverlay {
    private type;
    private idCapture;
    private _idLayout;
    private _idLayoutStyle;
    private _idLayoutLineStyle;
    static withIdCapture(idCapture: IdCapture): IdCaptureOverlay;
    static withIdCaptureForView(idCapture: IdCapture, view: DataCaptureView | null): IdCaptureOverlay;
    private constructor();
    setIdLayout(idLayout: IdLayout): void;
    get idLayoutStyle(): IdLayoutStyle;
    set idLayoutStyle(style: IdLayoutStyle);
    get idLayoutLineStyle(): IdLayoutLineStyle;
    set idLayoutLineStyle(lineStyle: IdLayoutLineStyle);
}


export class IdCaptureSettings {
    private properties;
    private imageToResult;
    supportedDocuments: IdDocumentType[];
    supportedSides: SupportedSides;
    constructor();
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    setShouldPassImageTypeToResult(type: IdImageType, shouldPass: boolean): void;
    getShouldPassImageTypeToResult(type: IdImageType): boolean;
}

}
