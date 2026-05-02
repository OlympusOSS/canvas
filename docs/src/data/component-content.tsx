import { lazy, type ReactNode } from "react";
import type { PropsOverrideMap } from "../components/PropsTable";

export interface ExampleContent {
	id: string;
	title: string;
	description?: string;
	filename?: string;
	render: () => ReactNode;
	source: string;
}

export interface ComponentContent {
	id: string;
	tier: "atoms" | "molecules" | "organisms" | "templates" | "charts";
	displayName: string;
	overview: string;
	importLine: string;
	examples?: ExampleContent[];
	a11y?: string[];
	tokens?: string[];
	/** Per-prop description/default overrides merged on top of extracted metadata. */
	propsOverride?: PropsOverrideMap;
	/** Source identifier used to look up extracted props in generated.json */
	propsSource: string;
	/**
	 * When the source file exports multiple components, restrict the props
	 * table to these display names. Defaults to all components in the source.
	 * Use this when one source file backs many docs pages — e.g. all 12
	 * chart-type wrappers live in `charts/chart-types`, but each page should
	 * only show its own component's props.
	 */
	propsDisplayNames?: string[];
}

// =============================================================================
// ATOMS
// =============================================================================

// aspect-ratio
const AspectRatioDefault = lazy(() => import("../examples/aspect-ratio/default"));
const AspectRatioRatios = lazy(() => import("../examples/aspect-ratio/ratios"));
const AspectRatioWithImage = lazy(() => import("../examples/aspect-ratio/with-image"));

import aspectRatioDefaultSource from "../examples/aspect-ratio/default?raw";
import aspectRatioRatiosSource from "../examples/aspect-ratio/ratios?raw";
import aspectRatioWithImageSource from "../examples/aspect-ratio/with-image?raw";

// avatar
const AvatarDefault = lazy(() => import("../examples/avatar/default"));
const AvatarFallback_ = lazy(() => import("../examples/avatar/fallback"));
const AvatarSizes = lazy(() => import("../examples/avatar/sizes"));
const AvatarStack = lazy(() => import("../examples/avatar/stack"));
const AvatarAsChild = lazy(() => import("../examples/avatar/as-child"));

import avatarAsChildSource from "../examples/avatar/as-child?raw";
import avatarDefaultSource from "../examples/avatar/default?raw";
import avatarFallbackSource from "../examples/avatar/fallback?raw";
import avatarSizesSource from "../examples/avatar/sizes?raw";
import avatarStackSource from "../examples/avatar/stack?raw";

// badge
const BadgeDefault = lazy(() => import("../examples/badge/default"));
const BadgeVariants = lazy(() => import("../examples/badge/variants"));
const BadgeWithIcon = lazy(() => import("../examples/badge/with-icon"));

import badgeDefaultSource from "../examples/badge/default?raw";
import badgeVariantsSource from "../examples/badge/variants?raw";
import badgeWithIconSource from "../examples/badge/with-icon?raw";

// button
const ButtonDefault = lazy(() => import("../examples/button/default"));
const ButtonVariants = lazy(() => import("../examples/button/variants"));
const ButtonSizes = lazy(() => import("../examples/button/sizes"));
const ButtonDisabled = lazy(() => import("../examples/button/disabled"));
const ButtonAsChild = lazy(() => import("../examples/button/as-child"));
const ButtonWithIcon = lazy(() => import("../examples/button/with-icon"));

import buttonAsChildSource from "../examples/button/as-child?raw";
import buttonDefaultSource from "../examples/button/default?raw";
import buttonDisabledSource from "../examples/button/disabled?raw";
import buttonSizesSource from "../examples/button/sizes?raw";
import buttonVariantsSource from "../examples/button/variants?raw";
import buttonWithIconSource from "../examples/button/with-icon?raw";

// checkbox
const CheckboxDefault = lazy(() => import("../examples/checkbox/default"));
const CheckboxStates = lazy(() => import("../examples/checkbox/states"));

import checkboxDefaultSource from "../examples/checkbox/default?raw";
import checkboxStatesSource from "../examples/checkbox/states?raw";

// flex-box
const FlexBoxDefault = lazy(() => import("../examples/flex-box/default"));
const FlexBoxDirections = lazy(() => import("../examples/flex-box/directions"));
const FlexBoxAlignment = lazy(() => import("../examples/flex-box/alignment"));
const FlexBoxJustification = lazy(() => import("../examples/flex-box/justification"));
const FlexBoxWrap = lazy(() => import("../examples/flex-box/wrap"));

import flexBoxAlignmentSource from "../examples/flex-box/alignment?raw";
import flexBoxDefaultSource from "../examples/flex-box/default?raw";
import flexBoxDirectionsSource from "../examples/flex-box/directions?raw";
import flexBoxJustificationSource from "../examples/flex-box/justification?raw";
import flexBoxWrapSource from "../examples/flex-box/wrap?raw";

// icon
const IconDefault = lazy(() => import("../examples/icon/default"));
const IconSizes = lazy(() => import("../examples/icon/sizes"));

import iconDefaultSource from "../examples/icon/default?raw";
import iconSizesSource from "../examples/icon/sizes?raw";

// input
const InputDefault = lazy(() => import("../examples/input/default"));
const InputTypes = lazy(() => import("../examples/input/types"));
const InputStates = lazy(() => import("../examples/input/states"));

import inputDefaultSource from "../examples/input/default?raw";
import inputStatesSource from "../examples/input/states?raw";
import inputTypesSource from "../examples/input/types?raw";

// label
const LabelDefault = lazy(() => import("../examples/label/default"));

import labelDefaultSource from "../examples/label/default?raw";

// brand-mark
const BrandMarkDefault = lazy(() => import("../examples/brand-mark/default"));
const BrandMarkSizes = lazy(() => import("../examples/brand-mark/sizes"));
const BrandMarkWithGradient = lazy(() => import("../examples/brand-mark/with-gradient"));

import brandMarkDefaultSource from "../examples/brand-mark/default?raw";
import brandMarkSizesSource from "../examples/brand-mark/sizes?raw";
import brandMarkWithGradientSource from "../examples/brand-mark/with-gradient?raw";

// progress
const ProgressDefault = lazy(() => import("../examples/progress/default"));
const ProgressStates = lazy(() => import("../examples/progress/states"));

import progressDefaultSource from "../examples/progress/default?raw";
import progressStatesSource from "../examples/progress/states?raw";

// radio-group
const RadioGroupDefault = lazy(() => import("../examples/radio-group/default"));
const RadioGroupDisabled = lazy(() => import("../examples/radio-group/disabled"));
const RadioGroupOrientations = lazy(() => import("../examples/radio-group/orientations"));

import radioGroupDefaultSource from "../examples/radio-group/default?raw";
import radioGroupDisabledSource from "../examples/radio-group/disabled?raw";
import radioGroupOrientationsSource from "../examples/radio-group/orientations?raw";

// scroll-area
const ScrollAreaDefault = lazy(() => import("../examples/scroll-area/default"));
const ScrollAreaHorizontal = lazy(() => import("../examples/scroll-area/horizontal"));

import scrollAreaDefaultSource from "../examples/scroll-area/default?raw";
import scrollAreaHorizontalSource from "../examples/scroll-area/horizontal?raw";

// section
const SectionDefault = lazy(() => import("../examples/section/default"));
const SectionSpacings = lazy(() => import("../examples/section/spacings"));

import sectionDefaultSource from "../examples/section/default?raw";
import sectionSpacingsSource from "../examples/section/spacings?raw";

// separator
const SeparatorDefault = lazy(() => import("../examples/separator/default"));
const SeparatorOrientations = lazy(() => import("../examples/separator/orientations"));

import separatorDefaultSource from "../examples/separator/default?raw";
import separatorOrientationsSource from "../examples/separator/orientations?raw";

// skeleton
const SkeletonDefault = lazy(() => import("../examples/skeleton/default"));
const SkeletonShapes = lazy(() => import("../examples/skeleton/shapes"));

import skeletonDefaultSource from "../examples/skeleton/default?raw";
import skeletonShapesSource from "../examples/skeleton/shapes?raw";

// slider
const SliderDefault = lazy(() => import("../examples/slider/default"));
const SliderRange = lazy(() => import("../examples/slider/range"));
const SliderWithStep = lazy(() => import("../examples/slider/with-step"));

import sliderDefaultSource from "../examples/slider/default?raw";
import sliderRangeSource from "../examples/slider/range?raw";
import sliderWithStepSource from "../examples/slider/with-step?raw";

// switch
const SwitchDefault = lazy(() => import("../examples/switch/default"));
const SwitchStates = lazy(() => import("../examples/switch/states"));

import switchDefaultSource from "../examples/switch/default?raw";
import switchStatesSource from "../examples/switch/states?raw";

// textarea
const TextareaDefault = lazy(() => import("../examples/textarea/default"));
const TextareaStates = lazy(() => import("../examples/textarea/states"));
const TextareaSizes = lazy(() => import("../examples/textarea/sizes"));

import textareaDefaultSource from "../examples/textarea/default?raw";
import textareaSizesSource from "../examples/textarea/sizes?raw";
import textareaStatesSource from "../examples/textarea/states?raw";

// toggle
const ToggleDefault = lazy(() => import("../examples/toggle/default"));
const ToggleVariants = lazy(() => import("../examples/toggle/variants"));
const ToggleSizes = lazy(() => import("../examples/toggle/sizes"));
const ToggleStates = lazy(() => import("../examples/toggle/states"));

import toggleDefaultSource from "../examples/toggle/default?raw";
import toggleSizesSource from "../examples/toggle/sizes?raw";
import toggleStatesSource from "../examples/toggle/states?raw";
import toggleVariantsSource from "../examples/toggle/variants?raw";

// =============================================================================
// MOLECULES
// =============================================================================

// action-bar
const ActionBarDefault = lazy(() => import("../examples/action-bar/default"));
const ActionBarAlignment = lazy(() => import("../examples/action-bar/alignment"));

import actionBarAlignmentSource from "../examples/action-bar/alignment?raw";
import actionBarDefaultSource from "../examples/action-bar/default?raw";

// alert
const AlertDefault = lazy(() => import("../examples/alert/default"));
const AlertVariants = lazy(() => import("../examples/alert/variants"));
const AlertWithIcon = lazy(() => import("../examples/alert/with-icon"));
const AlertWithAction = lazy(() => import("../examples/alert/with-action"));

import alertDefaultSource from "../examples/alert/default?raw";
import alertVariantsSource from "../examples/alert/variants?raw";
import alertWithActionSource from "../examples/alert/with-action?raw";
import alertWithIconSource from "../examples/alert/with-icon?raw";

// animated-background
const AnimatedBackgroundDefault = lazy(() => import("../examples/animated-background/default"));
const AnimatedBackgroundCustomOrbs = lazy(
	() => import("../examples/animated-background/custom-orbs"),
);

import animatedBackgroundCustomOrbsSource from "../examples/animated-background/custom-orbs?raw";
import animatedBackgroundDefaultSource from "../examples/animated-background/default?raw";

// breadcrumb
const BreadcrumbDefault = lazy(() => import("../examples/breadcrumb/default"));
const BreadcrumbWithEllipsis = lazy(() => import("../examples/breadcrumb/with-ellipsis"));
const BreadcrumbCustomSeparator = lazy(() => import("../examples/breadcrumb/custom-separator"));

import breadcrumbCustomSeparatorSource from "../examples/breadcrumb/custom-separator?raw";
import breadcrumbDefaultSource from "../examples/breadcrumb/default?raw";
import breadcrumbWithEllipsisSource from "../examples/breadcrumb/with-ellipsis?raw";

// button-group
const ButtonGroupDefault = lazy(() => import("../examples/button-group/default"));
const ButtonGroupOrientations = lazy(() => import("../examples/button-group/orientations"));
const ButtonGroupWithText = lazy(() => import("../examples/button-group/with-text"));

import buttonGroupDefaultSource from "../examples/button-group/default?raw";
import buttonGroupOrientationsSource from "../examples/button-group/orientations?raw";
import buttonGroupWithTextSource from "../examples/button-group/with-text?raw";

// calendar
const CalendarDefault = lazy(() => import("../examples/calendar/default"));
const CalendarRange = lazy(() => import("../examples/calendar/range"));
const CalendarMultiple = lazy(() => import("../examples/calendar/multiple"));
const CalendarButtonVariants = lazy(() => import("../examples/calendar/button-variants"));
const CalendarDisabledPast = lazy(() => import("../examples/calendar/disabled-past"));
const CalendarDropdownCaption = lazy(() => import("../examples/calendar/dropdown-caption"));
const CalendarDefaultMonth = lazy(() => import("../examples/calendar/default-month"));
const CalendarMultipleMonths = lazy(() => import("../examples/calendar/multiple-months"));
const CalendarFixedWeeks = lazy(() => import("../examples/calendar/fixed-weeks"));
const CalendarWeekNumbers = lazy(() => import("../examples/calendar/week-numbers"));
const CalendarIsoWeek = lazy(() => import("../examples/calendar/iso-week"));
const CalendarWeekStartsMonday = lazy(() => import("../examples/calendar/week-starts-monday"));
const CalendarSelectionLimits = lazy(() => import("../examples/calendar/selection-limits"));
const CalendarRequired = lazy(() => import("../examples/calendar/required"));
const CalendarHideNavigation = lazy(() => import("../examples/calendar/hide-navigation"));
const CalendarCustomModifiers = lazy(() => import("../examples/calendar/custom-modifiers"));
const CalendarWithFooter = lazy(() => import("../examples/calendar/with-footer"));
const CalendarLocalized = lazy(() => import("../examples/calendar/localized"));
const CalendarControlledMonth = lazy(() => import("../examples/calendar/controlled-month"));

import calendarButtonVariantsSource from "../examples/calendar/button-variants?raw";
import calendarControlledMonthSource from "../examples/calendar/controlled-month?raw";
import calendarCustomModifiersSource from "../examples/calendar/custom-modifiers?raw";
import calendarDefaultSource from "../examples/calendar/default?raw";
import calendarDefaultMonthSource from "../examples/calendar/default-month?raw";
import calendarDisabledPastSource from "../examples/calendar/disabled-past?raw";
import calendarDropdownCaptionSource from "../examples/calendar/dropdown-caption?raw";
import calendarFixedWeeksSource from "../examples/calendar/fixed-weeks?raw";
import calendarHideNavigationSource from "../examples/calendar/hide-navigation?raw";
import calendarIsoWeekSource from "../examples/calendar/iso-week?raw";
import calendarLocalizedSource from "../examples/calendar/localized?raw";
import calendarMultipleSource from "../examples/calendar/multiple?raw";
import calendarMultipleMonthsSource from "../examples/calendar/multiple-months?raw";
import calendarRangeSource from "../examples/calendar/range?raw";
import calendarRequiredSource from "../examples/calendar/required?raw";
import calendarSelectionLimitsSource from "../examples/calendar/selection-limits?raw";
import calendarWeekNumbersSource from "../examples/calendar/week-numbers?raw";
import calendarWeekStartsMondaySource from "../examples/calendar/week-starts-monday?raw";
import calendarWithFooterSource from "../examples/calendar/with-footer?raw";

// card
const CardDefault = lazy(() => import("../examples/card/default"));
const CardWithFooter = lazy(() => import("../examples/card/with-footer"));
const CardWithImage = lazy(() => import("../examples/card/with-image"));

import cardDefaultSource from "../examples/card/default?raw";
import cardWithFooterSource from "../examples/card/with-footer?raw";
import cardWithImageSource from "../examples/card/with-image?raw";

// code-block
const CodeBlockDefault = lazy(() => import("../examples/code-block/default"));
const CodeBlockLanguages = lazy(() => import("../examples/code-block/languages"));
const CodeBlockWithoutCopy = lazy(() => import("../examples/code-block/without-copy"));

import codeBlockDefaultSource from "../examples/code-block/default?raw";
import codeBlockLanguagesSource from "../examples/code-block/languages?raw";
import codeBlockWithoutCopySource from "../examples/code-block/without-copy?raw";

// empty-state
const EmptyStateDefault = lazy(() => import("../examples/empty-state/default"));
const EmptyStateWithAction = lazy(() => import("../examples/empty-state/with-action"));
const EmptyStateMinimal = lazy(() => import("../examples/empty-state/minimal"));
const EmptyStateWithIllustration = lazy(() => import("../examples/empty-state/with-illustration"));

import emptyStateDefaultSource from "../examples/empty-state/default?raw";
import emptyStateMinimalSource from "../examples/empty-state/minimal?raw";
import emptyStateWithActionSource from "../examples/empty-state/with-action?raw";
import emptyStateWithIllustrationSource from "../examples/empty-state/with-illustration?raw";

// error-state
const ErrorStateDefault = lazy(() => import("../examples/error-state/default"));
const ErrorStateWithRetry = lazy(() => import("../examples/error-state/with-retry"));
const ErrorStateMinimal = lazy(() => import("../examples/error-state/minimal"));

import errorStateDefaultSource from "../examples/error-state/default?raw";
import errorStateMinimalSource from "../examples/error-state/minimal?raw";
import errorStateWithRetrySource from "../examples/error-state/with-retry?raw";

// field-display
const FieldDisplayDefault = lazy(() => import("../examples/field-display/default"));
const FieldDisplayMono = lazy(() => import("../examples/field-display/mono"));
const FieldDisplayMissing = lazy(() => import("../examples/field-display/missing"));

import fieldDisplayDefaultSource from "../examples/field-display/default?raw";
import fieldDisplayMissingSource from "../examples/field-display/missing?raw";
import fieldDisplayMonoSource from "../examples/field-display/mono?raw";

// input-otp
const InputOTPDefault = lazy(() => import("../examples/input-otp/default"));
const InputOTPWithSeparator = lazy(() => import("../examples/input-otp/with-separator"));
const InputOTPPasswordPattern = lazy(() => import("../examples/input-otp/password-pattern"));

import inputOTPDefaultSource from "../examples/input-otp/default?raw";
import inputOTPPasswordPatternSource from "../examples/input-otp/password-pattern?raw";
import inputOTPWithSeparatorSource from "../examples/input-otp/with-separator?raw";

// loading-state
const LoadingStateDefault = lazy(() => import("../examples/loading-state/default"));
const LoadingStateSizes = lazy(() => import("../examples/loading-state/sizes"));
const LoadingStateWithoutMessage = lazy(() => import("../examples/loading-state/without-message"));

import loadingStateDefaultSource from "../examples/loading-state/default?raw";
import loadingStateSizesSource from "../examples/loading-state/sizes?raw";
import loadingStateWithoutMessageSource from "../examples/loading-state/without-message?raw";

// page-header
const PageHeaderDefault = lazy(() => import("../examples/page-header/default"));
const PageHeaderWithIcon = lazy(() => import("../examples/page-header/with-icon"));
const PageHeaderWithActions = lazy(() => import("../examples/page-header/with-actions"));
const PageHeaderWithBreadcrumbs = lazy(() => import("../examples/page-header/with-breadcrumbs"));
const PageHeaderWithSubtitle = lazy(() => import("../examples/page-header/with-subtitle"));

import pageHeaderDefaultSource from "../examples/page-header/default?raw";
import pageHeaderWithActionsSource from "../examples/page-header/with-actions?raw";
import pageHeaderWithBreadcrumbsSource from "../examples/page-header/with-breadcrumbs?raw";
import pageHeaderWithIconSource from "../examples/page-header/with-icon?raw";
import pageHeaderWithSubtitleSource from "../examples/page-header/with-subtitle?raw";

// page-tabs
const PageTabsDefault = lazy(() => import("../examples/page-tabs/default"));
const PageTabsVariants = lazy(() => import("../examples/page-tabs/variants"));
const PageTabsWithIcons = lazy(() => import("../examples/page-tabs/with-icons"));
const PageTabsWithBadges = lazy(() => import("../examples/page-tabs/with-badges"));

import pageTabsDefaultSource from "../examples/page-tabs/default?raw";
import pageTabsVariantsSource from "../examples/page-tabs/variants?raw";
import pageTabsWithBadgesSource from "../examples/page-tabs/with-badges?raw";
import pageTabsWithIconsSource from "../examples/page-tabs/with-icons?raw";

// pagination
const PaginationDefault = lazy(() => import("../examples/pagination/default"));
const PaginationWithEllipsis = lazy(() => import("../examples/pagination/with-ellipsis"));
const PaginationSizes = lazy(() => import("../examples/pagination/sizes"));

import paginationDefaultSource from "../examples/pagination/default?raw";
import paginationSizesSource from "../examples/pagination/sizes?raw";
import paginationWithEllipsisSource from "../examples/pagination/with-ellipsis?raw";

// phone-input
const PhoneInputDefault = lazy(() => import("../examples/phone-input/default"));
const PhoneInputWithValidation = lazy(() => import("../examples/phone-input/with-validation"));
const PhoneInputRestrictedCountries = lazy(
	() => import("../examples/phone-input/restricted-countries"),
);
const PhoneInputDisabled = lazy(() => import("../examples/phone-input/disabled"));

import phoneInputDefaultSource from "../examples/phone-input/default?raw";
import phoneInputDisabledSource from "../examples/phone-input/disabled?raw";
import phoneInputRestrictedCountriesSource from "../examples/phone-input/restricted-countries?raw";
import phoneInputWithValidationSource from "../examples/phone-input/with-validation?raw";

// search-bar
const SearchBarDefault = lazy(() => import("../examples/search-bar/default"));
const SearchBarWithClear = lazy(() => import("../examples/search-bar/with-clear"));
const SearchBarDisabled = lazy(() => import("../examples/search-bar/disabled"));

import searchBarDefaultSource from "../examples/search-bar/default?raw";
import searchBarDisabledSource from "../examples/search-bar/disabled?raw";
import searchBarWithClearSource from "../examples/search-bar/with-clear?raw";

// secret-field
const SecretFieldDefault = lazy(() => import("../examples/secret-field/default"));
const SecretFieldWithValidation = lazy(() => import("../examples/secret-field/with-validation"));
const SecretFieldRevealable = lazy(() => import("../examples/secret-field/revealable"));

import secretFieldDefaultSource from "../examples/secret-field/default?raw";
import secretFieldRevealableSource from "../examples/secret-field/revealable?raw";
import secretFieldWithValidationSource from "../examples/secret-field/with-validation?raw";

// section-card
const SectionCardDefault = lazy(() => import("../examples/section-card/default"));
const SectionCardWithHeaderActions = lazy(
	() => import("../examples/section-card/with-header-actions"),
);
const SectionCardLoading = lazy(() => import("../examples/section-card/loading"));
const SectionCardError = lazy(() => import("../examples/section-card/error"));
const SectionCardEmpty = lazy(() => import("../examples/section-card/empty"));
const SectionCardNoPadding = lazy(() => import("../examples/section-card/no-padding"));

import sectionCardDefaultSource from "../examples/section-card/default?raw";
import sectionCardEmptySource from "../examples/section-card/empty?raw";
import sectionCardErrorSource from "../examples/section-card/error?raw";
import sectionCardLoadingSource from "../examples/section-card/loading?raw";
import sectionCardNoPaddingSource from "../examples/section-card/no-padding?raw";
import sectionCardWithHeaderActionsSource from "../examples/section-card/with-header-actions?raw";

// stat-card
const StatCardDefault = lazy(() => import("../examples/stat-card/default"));
const StatCardColors = lazy(() => import("../examples/stat-card/colors"));
const StatCardWithIcon = lazy(() => import("../examples/stat-card/with-icon"));
const StatCardWithoutIcon = lazy(() => import("../examples/stat-card/without-icon"));

import statCardColorsSource from "../examples/stat-card/colors?raw";
import statCardDefaultSource from "../examples/stat-card/default?raw";
import statCardWithIconSource from "../examples/stat-card/with-icon?raw";
import statCardWithoutIconSource from "../examples/stat-card/without-icon?raw";

// status-badge
const StatusBadgeDefault = lazy(() => import("../examples/status-badge/default"));
const StatusBadgeNoDot = lazy(() => import("../examples/status-badge/no-dot"));
const StatusBadgeVariants = lazy(() => import("../examples/status-badge/variants"));

import statusBadgeDefaultSource from "../examples/status-badge/default?raw";
import statusBadgeNoDotSource from "../examples/status-badge/no-dot?raw";
import statusBadgeVariantsSource from "../examples/status-badge/variants?raw";

// stepper
const StepperDefault = lazy(() => import("../examples/stepper/default"));
const StepperOrientations = lazy(() => import("../examples/stepper/orientations"));
const StepperWithErrorStep = lazy(() => import("../examples/stepper/with-error-step"));
const StepperClickable = lazy(() => import("../examples/stepper/clickable"));

import stepperClickableSource from "../examples/stepper/clickable?raw";
import stepperDefaultSource from "../examples/stepper/default?raw";
import stepperOrientationsSource from "../examples/stepper/orientations?raw";
import stepperWithErrorStepSource from "../examples/stepper/with-error-step?raw";

// table
const TableDefault = lazy(() => import("../examples/table/default"));
const TableWithCaption = lazy(() => import("../examples/table/with-caption"));
const TableWithFooter = lazy(() => import("../examples/table/with-footer"));
const TableWithRowSelection = lazy(() => import("../examples/table/with-row-selection"));

import tableDefaultSource from "../examples/table/default?raw";
import tableWithCaptionSource from "../examples/table/with-caption?raw";
import tableWithFooterSource from "../examples/table/with-footer?raw";
import tableWithRowSelectionSource from "../examples/table/with-row-selection?raw";

// toggle-group
const ToggleGroupDefault = lazy(() => import("../examples/toggle-group/default"));
const ToggleGroupVariants = lazy(() => import("../examples/toggle-group/variants"));
const ToggleGroupSizes = lazy(() => import("../examples/toggle-group/sizes"));
const ToggleGroupMultiple = lazy(() => import("../examples/toggle-group/multiple"));
const ToggleGroupWithIcons = lazy(() => import("../examples/toggle-group/with-icons"));

import toggleGroupDefaultSource from "../examples/toggle-group/default?raw";
import toggleGroupMultipleSource from "../examples/toggle-group/multiple?raw";
import toggleGroupSizesSource from "../examples/toggle-group/sizes?raw";
import toggleGroupVariantsSource from "../examples/toggle-group/variants?raw";
import toggleGroupWithIconsSource from "../examples/toggle-group/with-icons?raw";

// tooltip
const TooltipDefault = lazy(() => import("../examples/tooltip/default"));
const TooltipSides = lazy(() => import("../examples/tooltip/sides"));
const TooltipDelayed = lazy(() => import("../examples/tooltip/delayed"));
const TooltipDisabledTrigger = lazy(() => import("../examples/tooltip/disabled-trigger"));

import tooltipDefaultSource from "../examples/tooltip/default?raw";
import tooltipDelayedSource from "../examples/tooltip/delayed?raw";
import tooltipDisabledTriggerSource from "../examples/tooltip/disabled-trigger?raw";
import tooltipSidesSource from "../examples/tooltip/sides?raw";

// activity-item
const ActivityItemDefault = lazy(() => import("../examples/activity-item/default"));
const ActivityItemWithAvatar = lazy(() => import("../examples/activity-item/with-avatar"));
const ActivityItemClickable = lazy(() => import("../examples/activity-item/clickable"));

import activityItemClickableSource from "../examples/activity-item/clickable?raw";
import activityItemDefaultSource from "../examples/activity-item/default?raw";
import activityItemWithAvatarSource from "../examples/activity-item/with-avatar?raw";

// brand-lockup
const BrandLockupDefault = lazy(() => import("../examples/brand-lockup/default"));
const BrandLockupCollapsed = lazy(() => import("../examples/brand-lockup/collapsed"));
const BrandLockupSizes = lazy(() => import("../examples/brand-lockup/sizes"));

import brandLockupCollapsedSource from "../examples/brand-lockup/collapsed?raw";
import brandLockupDefaultSource from "../examples/brand-lockup/default?raw";
import brandLockupSizesSource from "../examples/brand-lockup/sizes?raw";

// notification-item
const NotificationItemDefault = lazy(() => import("../examples/notification-item/default"));
const NotificationItemWithAvatar = lazy(() => import("../examples/notification-item/with-avatar"));
const NotificationItemWithoutTimestamp = lazy(
	() => import("../examples/notification-item/without-timestamp"),
);

import notificationItemDefaultSource from "../examples/notification-item/default?raw";
import notificationItemWithAvatarSource from "../examples/notification-item/with-avatar?raw";
import notificationItemWithoutTimestampSource from "../examples/notification-item/without-timestamp?raw";

// notification-list
const NotificationListDefault = lazy(() => import("../examples/notification-list/default"));
const NotificationListEmpty = lazy(() => import("../examples/notification-list/empty"));

import notificationListDefaultSource from "../examples/notification-list/default?raw";
import notificationListEmptySource from "../examples/notification-list/empty?raw";

// number-badge
const NumberBadgeDefault = lazy(() => import("../examples/number-badge/default"));
const NumberBadgeVariants = lazy(() => import("../examples/number-badge/variants"));

import numberBadgeDefaultSource from "../examples/number-badge/default?raw";
import numberBadgeVariantsSource from "../examples/number-badge/variants?raw";

// activity-heatmap
const ActivityHeatmapDefault = lazy(() => import("../examples/activity-heatmap/default"));
const ActivityHeatmapWeek = lazy(() => import("../examples/activity-heatmap/week"));
const ActivityHeatmapDense = lazy(() => import("../examples/activity-heatmap/dense"));

import activityHeatmapDefaultSource from "../examples/activity-heatmap/default?raw";
import activityHeatmapDenseSource from "../examples/activity-heatmap/dense?raw";
import activityHeatmapWeekSource from "../examples/activity-heatmap/week?raw";

// gauge
const GaugeDefault = lazy(() => import("../examples/gauge/default"));
const GaugeCustomLabel = lazy(() => import("../examples/gauge/custom-label"));
const GaugeColors = lazy(() => import("../examples/gauge/colors"));

import gaugeColorsSource from "../examples/gauge/colors?raw";
import gaugeCustomLabelSource from "../examples/gauge/custom-label?raw";
import gaugeDefaultSource from "../examples/gauge/default?raw";

// labeled-bar-list
const LabeledBarListDefault = lazy(() => import("../examples/labeled-bar-list/default"));
const LabeledBarListNoLeading = lazy(() => import("../examples/labeled-bar-list/no-leading"));
const LabeledBarListStorage = lazy(() => import("../examples/labeled-bar-list/storage"));

import labeledBarListDefaultSource from "../examples/labeled-bar-list/default?raw";
import labeledBarListNoLeadingSource from "../examples/labeled-bar-list/no-leading?raw";
import labeledBarListStorageSource from "../examples/labeled-bar-list/storage?raw";

// service-health-list
const ServiceHealthListDefault = lazy(() => import("../examples/service-health-list/default"));
const ServiceHealthListAllHealthy = lazy(
	() => import("../examples/service-health-list/all-healthy"),
);
const ServiceHealthListMinimal = lazy(() => import("../examples/service-health-list/minimal"));

import serviceHealthListAllHealthySource from "../examples/service-health-list/all-healthy?raw";
import serviceHealthListDefaultSource from "../examples/service-health-list/default?raw";
import serviceHealthListMinimalSource from "../examples/service-health-list/minimal?raw";

// stacked-bar
const StackedBarDefault = lazy(() => import("../examples/stacked-bar/default"));
const StackedBarNoLegend = lazy(() => import("../examples/stacked-bar/no-legend"));
const StackedBarRawCounts = lazy(() => import("../examples/stacked-bar/raw-counts"));

import stackedBarDefaultSource from "../examples/stacked-bar/default?raw";
import stackedBarNoLegendSource from "../examples/stacked-bar/no-legend?raw";
import stackedBarRawCountsSource from "../examples/stacked-bar/raw-counts?raw";

// sparkline
const SparklineDefault = lazy(() => import("../examples/sparkline/default"));
const SparklineColorVariants = lazy(() => import("../examples/sparkline/color-variants"));
const SparklineInline = lazy(() => import("../examples/sparkline/inline"));

import sparklineColorVariantsSource from "../examples/sparkline/color-variants?raw";
import sparklineDefaultSource from "../examples/sparkline/default?raw";
import sparklineInlineSource from "../examples/sparkline/inline?raw";

// user-avatar-chip
const UserAvatarChipDefault = lazy(() => import("../examples/user-avatar-chip/default"));
const UserAvatarChipWithEmail = lazy(() => import("../examples/user-avatar-chip/with-email"));
const UserAvatarChipCollapsed = lazy(() => import("../examples/user-avatar-chip/collapsed"));

import userAvatarChipCollapsedSource from "../examples/user-avatar-chip/collapsed?raw";
import userAvatarChipDefaultSource from "../examples/user-avatar-chip/default?raw";
import userAvatarChipWithEmailSource from "../examples/user-avatar-chip/with-email?raw";

// =============================================================================
// ORGANISMS
// =============================================================================

// code-editor
const CodeEditorDefault = lazy(() => import("../examples/code-editor/default"));

import codeEditorDefaultSource from "../examples/code-editor/default?raw";

// markdown-editor
const MarkdownEditorDefault = lazy(() => import("../examples/markdown-editor/default"));

import markdownEditorDefaultSource from "../examples/markdown-editor/default?raw";

// rich-text-editor
const RichTextEditorDefault = lazy(() => import("../examples/rich-text-editor/default"));

import richTextEditorDefaultSource from "../examples/rich-text-editor/default?raw";

// accordion
const AccordionDefault = lazy(() => import("../examples/accordion/default"));
const AccordionMultiple = lazy(() => import("../examples/accordion/multiple"));
const AccordionDefaultOpen = lazy(() => import("../examples/accordion/default-open"));
const AccordionDisabledItem = lazy(() => import("../examples/accordion/disabled-item"));

import accordionDefaultSource from "../examples/accordion/default?raw";
import accordionDefaultOpenSource from "../examples/accordion/default-open?raw";
import accordionDisabledItemSource from "../examples/accordion/disabled-item?raw";
import accordionMultipleSource from "../examples/accordion/multiple?raw";

// alert-dialog
const AlertDialogDefault = lazy(() => import("../examples/alert-dialog/default"));
const AlertDialogDestructive = lazy(() => import("../examples/alert-dialog/destructive"));
const AlertDialogControlled = lazy(() => import("../examples/alert-dialog/controlled"));

import alertDialogControlledSource from "../examples/alert-dialog/controlled?raw";
import alertDialogDefaultSource from "../examples/alert-dialog/default?raw";
import alertDialogDestructiveSource from "../examples/alert-dialog/destructive?raw";

// carousel
const CarouselDefault = lazy(() => import("../examples/carousel/default"));
const CarouselOrientations = lazy(() => import("../examples/carousel/orientations"));
const CarouselWithPagination = lazy(() => import("../examples/carousel/with-pagination"));
const CarouselLoop = lazy(() => import("../examples/carousel/loop"));

import carouselDefaultSource from "../examples/carousel/default?raw";
import carouselLoopSource from "../examples/carousel/loop?raw";
import carouselOrientationsSource from "../examples/carousel/orientations?raw";
import carouselWithPaginationSource from "../examples/carousel/with-pagination?raw";

// charts tier — themed Recharts wrapper pages
const LineChartDefault = lazy(() => import("../examples/line-chart/default"));
const LineChartMultiSeries = lazy(() => import("../examples/line-chart/multi-series"));
const LineChartWithReference = lazy(() => import("../examples/line-chart/with-reference"));
const LineChartTimeSeries = lazy(() => import("../examples/line-chart/time-series"));
const LineChartWithBrush = lazy(() => import("../examples/line-chart/with-brush"));
const LineChartCurveTypes = lazy(() => import("../examples/line-chart/curve-types"));
const BarChartDefault = lazy(() => import("../examples/bar-chart/default"));
const BarChartMultiSeries = lazy(() => import("../examples/bar-chart/multi-series"));
const BarChartStacked = lazy(() => import("../examples/bar-chart/stacked"));
const BarChartHorizontal = lazy(() => import("../examples/bar-chart/horizontal"));
const BarChartWithLabels = lazy(() => import("../examples/bar-chart/with-labels"));
const AreaChartDefault = lazy(() => import("../examples/area-chart/default"));
const AreaChartStacked = lazy(() => import("../examples/area-chart/stacked"));
const AreaChartGradient = lazy(() => import("../examples/area-chart/gradient"));
const AreaChartCurveTypes = lazy(() => import("../examples/area-chart/curve-types"));
const PieChartDefault = lazy(() => import("../examples/pie-chart/default"));
const PieChartDonut = lazy(() => import("../examples/pie-chart/donut"));
const PieChartWithLabels = lazy(() => import("../examples/pie-chart/with-labels"));
const PieChartHalfPie = lazy(() => import("../examples/pie-chart/half-pie"));
const ScatterChartDefault = lazy(() => import("../examples/scatter-chart/default"));
const ScatterChartMultiSeries = lazy(() => import("../examples/scatter-chart/multi-series"));
const ScatterChartBubble = lazy(() => import("../examples/scatter-chart/bubble"));
const RadarChartDefault = lazy(() => import("../examples/radar-chart/default"));
const RadarChartMultiSeries = lazy(() => import("../examples/radar-chart/multi-series"));
const RadialBarChartDefault = lazy(() => import("../examples/radial-bar-chart/default"));
const ComposedChartDefault = lazy(() => import("../examples/composed-chart/default"));
const ComposedChartDualAxis = lazy(() => import("../examples/composed-chart/dual-axis"));
const FunnelChartDefault = lazy(() => import("../examples/funnel-chart/default"));
const TreemapDefault = lazy(() => import("../examples/treemap/default"));
const SankeyDefault = lazy(() => import("../examples/sankey/default"));
const SunburstChartDefault = lazy(() => import("../examples/sunburst-chart/default"));
const SunburstChartHalfCircle = lazy(() => import("../examples/sunburst-chart/half-circle"));
const WorldHeatMapDefault = lazy(() => import("../examples/world-heat-map/default"));
const WorldHeatMapWithTitleAndLegend = lazy(
	() => import("../examples/world-heat-map/with-title-and-legend"),
);
const WorldHeatMapLightTheme = lazy(() => import("../examples/world-heat-map/light-theme"));
const WorldHeatMapEmpty = lazy(() => import("../examples/world-heat-map/empty"));
const WorldHeatMapCustomMarker = lazy(() => import("../examples/world-heat-map/custom-marker"));
const WorldHeatMapWithClickHandler = lazy(
	() => import("../examples/world-heat-map/with-click-handler"),
);

import areaChartCurveTypesSource from "../examples/area-chart/curve-types?raw";
import areaChartDefaultSource from "../examples/area-chart/default?raw";
import areaChartGradientSource from "../examples/area-chart/gradient?raw";
import areaChartStackedSource from "../examples/area-chart/stacked?raw";
import barChartDefaultSource from "../examples/bar-chart/default?raw";
import barChartHorizontalSource from "../examples/bar-chart/horizontal?raw";
import barChartMultiSeriesSource from "../examples/bar-chart/multi-series?raw";
import barChartStackedSource from "../examples/bar-chart/stacked?raw";
import barChartWithLabelsSource from "../examples/bar-chart/with-labels?raw";
import composedChartDefaultSource from "../examples/composed-chart/default?raw";
import composedChartDualAxisSource from "../examples/composed-chart/dual-axis?raw";
import funnelChartDefaultSource from "../examples/funnel-chart/default?raw";
import lineChartCurveTypesSource from "../examples/line-chart/curve-types?raw";
import lineChartDefaultSource from "../examples/line-chart/default?raw";
import lineChartMultiSeriesSource from "../examples/line-chart/multi-series?raw";
import lineChartTimeSeriesSource from "../examples/line-chart/time-series?raw";
import lineChartWithBrushSource from "../examples/line-chart/with-brush?raw";
import lineChartWithReferenceSource from "../examples/line-chart/with-reference?raw";
import pieChartDefaultSource from "../examples/pie-chart/default?raw";
import pieChartDonutSource from "../examples/pie-chart/donut?raw";
import pieChartHalfPieSource from "../examples/pie-chart/half-pie?raw";
import pieChartWithLabelsSource from "../examples/pie-chart/with-labels?raw";
import radarChartDefaultSource from "../examples/radar-chart/default?raw";
import radarChartMultiSeriesSource from "../examples/radar-chart/multi-series?raw";
import radialBarChartDefaultSource from "../examples/radial-bar-chart/default?raw";
import sankeyDefaultSource from "../examples/sankey/default?raw";
import scatterChartBubbleSource from "../examples/scatter-chart/bubble?raw";
import scatterChartDefaultSource from "../examples/scatter-chart/default?raw";
import scatterChartMultiSeriesSource from "../examples/scatter-chart/multi-series?raw";
import sunburstChartDefaultSource from "../examples/sunburst-chart/default?raw";
import sunburstChartHalfCircleSource from "../examples/sunburst-chart/half-circle?raw";
import treemapDefaultSource from "../examples/treemap/default?raw";
import worldHeatMapCustomMarkerSource from "../examples/world-heat-map/custom-marker?raw";
import worldHeatMapDefaultSource from "../examples/world-heat-map/default?raw";
import worldHeatMapEmptySource from "../examples/world-heat-map/empty?raw";
import worldHeatMapLightThemeSource from "../examples/world-heat-map/light-theme?raw";
import worldHeatMapWithClickHandlerSource from "../examples/world-heat-map/with-click-handler?raw";
import worldHeatMapWithTitleAndLegendSource from "../examples/world-heat-map/with-title-and-legend?raw";

// collapsible
const CollapsibleDefault = lazy(() => import("../examples/collapsible/default"));
const CollapsibleDefaultOpen = lazy(() => import("../examples/collapsible/default-open"));
const CollapsibleControlled = lazy(() => import("../examples/collapsible/controlled"));

import collapsibleControlledSource from "../examples/collapsible/controlled?raw";
import collapsibleDefaultSource from "../examples/collapsible/default?raw";
import collapsibleDefaultOpenSource from "../examples/collapsible/default-open?raw";

// command
const CommandDefault = lazy(() => import("../examples/command/default"));
const CommandDialogEx = lazy(() => import("../examples/command/dialog"));
const CommandWithGroups = lazy(() => import("../examples/command/with-groups"));
const CommandWithShortcuts = lazy(() => import("../examples/command/with-shortcuts"));
const CommandEmptyState = lazy(() => import("../examples/command/empty-state"));

import commandDefaultSource from "../examples/command/default?raw";
import commandDialogSource from "../examples/command/dialog?raw";
import commandEmptyStateSource from "../examples/command/empty-state?raw";
import commandWithGroupsSource from "../examples/command/with-groups?raw";
import commandWithShortcutsSource from "../examples/command/with-shortcuts?raw";

// context-menu
const ContextMenuDefault = lazy(() => import("../examples/context-menu/default"));
const ContextMenuWithSubmenu = lazy(() => import("../examples/context-menu/with-submenu"));
const ContextMenuWithCheckboxes = lazy(() => import("../examples/context-menu/with-checkboxes"));
const ContextMenuWithRadioGroup = lazy(() => import("../examples/context-menu/with-radio-group"));
const ContextMenuInsetItems = lazy(() => import("../examples/context-menu/inset-items"));

import contextMenuDefaultSource from "../examples/context-menu/default?raw";
import contextMenuInsetItemsSource from "../examples/context-menu/inset-items?raw";
import contextMenuWithCheckboxesSource from "../examples/context-menu/with-checkboxes?raw";
import contextMenuWithRadioGroupSource from "../examples/context-menu/with-radio-group?raw";
import contextMenuWithSubmenuSource from "../examples/context-menu/with-submenu?raw";

// data-table
const DataTableDefault = lazy(() => import("../examples/data-table/default"));
const DataTableWithSearch = lazy(() => import("../examples/data-table/with-search"));
const DataTableWithPagination = lazy(() => import("../examples/data-table/with-pagination"));
const DataTableWithSelection = lazy(() => import("../examples/data-table/with-selection"));
const DataTableLoading = lazy(() => import("../examples/data-table/loading"));
const DataTableEmpty = lazy(() => import("../examples/data-table/empty"));
const DataTableWithAddButton = lazy(() => import("../examples/data-table/with-add-button"));
const DataTableWithRefresh = lazy(() => import("../examples/data-table/with-refresh"));
const DataTableControlledSearch = lazy(() => import("../examples/data-table/controlled-search"));
const DataTableControlledSelection = lazy(
	() => import("../examples/data-table/controlled-selection"),
);
const DataTableCustomPageSize = lazy(() => import("../examples/data-table/custom-page-size"));

import dataTableControlledSearchSource from "../examples/data-table/controlled-search?raw";
import dataTableControlledSelectionSource from "../examples/data-table/controlled-selection?raw";
import dataTableCustomPageSizeSource from "../examples/data-table/custom-page-size?raw";
import dataTableDefaultSource from "../examples/data-table/default?raw";
import dataTableEmptySource from "../examples/data-table/empty?raw";
import dataTableLoadingSource from "../examples/data-table/loading?raw";
import dataTableWithAddButtonSource from "../examples/data-table/with-add-button?raw";
import dataTableWithPaginationSource from "../examples/data-table/with-pagination?raw";
import dataTableWithRefreshSource from "../examples/data-table/with-refresh?raw";
import dataTableWithSearchSource from "../examples/data-table/with-search?raw";
import dataTableWithSelectionSource from "../examples/data-table/with-selection?raw";

// dialog
const DialogDefault = lazy(() => import("../examples/dialog/default"));
const DialogFormInside = lazy(() => import("../examples/dialog/form-inside"));
const DialogControlled = lazy(() => import("../examples/dialog/controlled"));
const DialogNested = lazy(() => import("../examples/dialog/nested"));
const DialogScrollableContent = lazy(() => import("../examples/dialog/scrollable-content"));

import dialogControlledSource from "../examples/dialog/controlled?raw";
import dialogDefaultSource from "../examples/dialog/default?raw";
import dialogFormInsideSource from "../examples/dialog/form-inside?raw";
import dialogNestedSource from "../examples/dialog/nested?raw";
import dialogScrollableContentSource from "../examples/dialog/scrollable-content?raw";

// drawer
const DrawerDefault = lazy(() => import("../examples/drawer/default"));
const DrawerDirections = lazy(() => import("../examples/drawer/directions"));
const DrawerWithSnapPoints = lazy(() => import("../examples/drawer/with-snap-points"));
const DrawerNested = lazy(() => import("../examples/drawer/nested"));
const DrawerControlled = lazy(() => import("../examples/drawer/controlled"));

import drawerControlledSource from "../examples/drawer/controlled?raw";
import drawerDefaultSource from "../examples/drawer/default?raw";
import drawerDirectionsSource from "../examples/drawer/directions?raw";
import drawerNestedSource from "../examples/drawer/nested?raw";
import drawerWithSnapPointsSource from "../examples/drawer/with-snap-points?raw";

// dropdown-menu
const DropdownMenuDefault = lazy(() => import("../examples/dropdown-menu/default"));
const DropdownMenuWithSubmenu = lazy(() => import("../examples/dropdown-menu/with-submenu"));
const DropdownMenuWithCheckboxes = lazy(() => import("../examples/dropdown-menu/with-checkboxes"));
const DropdownMenuWithRadioGroup = lazy(() => import("../examples/dropdown-menu/with-radio-group"));
const DropdownMenuWithShortcuts = lazy(() => import("../examples/dropdown-menu/with-shortcuts"));
const DropdownMenuInsetItems = lazy(() => import("../examples/dropdown-menu/inset-items"));

import dropdownMenuDefaultSource from "../examples/dropdown-menu/default?raw";
import dropdownMenuInsetItemsSource from "../examples/dropdown-menu/inset-items?raw";
import dropdownMenuWithCheckboxesSource from "../examples/dropdown-menu/with-checkboxes?raw";
import dropdownMenuWithRadioGroupSource from "../examples/dropdown-menu/with-radio-group?raw";
import dropdownMenuWithShortcutsSource from "../examples/dropdown-menu/with-shortcuts?raw";
import dropdownMenuWithSubmenuSource from "../examples/dropdown-menu/with-submenu?raw";

// error-boundary
const ErrorBoundaryDefault = lazy(() => import("../examples/error-boundary/default"));
const ErrorBoundaryCustomFallback = lazy(
	() => import("../examples/error-boundary/custom-fallback"),
);

import errorBoundaryCustomFallbackSource from "../examples/error-boundary/custom-fallback?raw";
import errorBoundaryDefaultSource from "../examples/error-boundary/default?raw";

// form
const FormDefault = lazy(() => import("../examples/form/default"));
const FormWithValidation = lazy(() => import("../examples/form/with-validation"));
const FormMultiField = lazy(() => import("../examples/form/multi-field"));
const FormWithFieldArray = lazy(() => import("../examples/form/with-field-array"));
const FormDisabledField = lazy(() => import("../examples/form/disabled-field"));

import formDefaultSource from "../examples/form/default?raw";
import formDisabledFieldSource from "../examples/form/disabled-field?raw";
import formMultiFieldSource from "../examples/form/multi-field?raw";
import formWithFieldArraySource from "../examples/form/with-field-array?raw";
import formWithValidationSource from "../examples/form/with-validation?raw";

// hover-card
const HoverCardDefault = lazy(() => import("../examples/hover-card/default"));
const HoverCardWithImage = lazy(() => import("../examples/hover-card/with-image"));
const HoverCardControlled = lazy(() => import("../examples/hover-card/controlled"));
const HoverCardDelayedOpen = lazy(() => import("../examples/hover-card/delayed-open"));

import hoverCardControlledSource from "../examples/hover-card/controlled?raw";
import hoverCardDefaultSource from "../examples/hover-card/default?raw";
import hoverCardDelayedOpenSource from "../examples/hover-card/delayed-open?raw";
import hoverCardWithImageSource from "../examples/hover-card/with-image?raw";

// menubar
const MenubarDefault = lazy(() => import("../examples/menubar/default"));
const MenubarWithShortcuts = lazy(() => import("../examples/menubar/with-shortcuts"));
const MenubarWithSubmenu = lazy(() => import("../examples/menubar/with-submenu"));
const MenubarWithCheckboxes = lazy(() => import("../examples/menubar/with-checkboxes"));

import menubarDefaultSource from "../examples/menubar/default?raw";
import menubarWithCheckboxesSource from "../examples/menubar/with-checkboxes?raw";
import menubarWithShortcutsSource from "../examples/menubar/with-shortcuts?raw";
import menubarWithSubmenuSource from "../examples/menubar/with-submenu?raw";

// navbar
const NavBarDefault = lazy(() => import("../examples/navbar/default"));
const NavBarSticky = lazy(() => import("../examples/navbar/sticky"));
const NavBarWithActions = lazy(() => import("../examples/navbar/with-actions"));
const NavBarMobileMenu = lazy(() => import("../examples/navbar/mobile-menu"));

import navBarDefaultSource from "../examples/navbar/default?raw";
import navBarMobileMenuSource from "../examples/navbar/mobile-menu?raw";
import navBarStickySource from "../examples/navbar/sticky?raw";
import navBarWithActionsSource from "../examples/navbar/with-actions?raw";

// navigation-menu
const NavigationMenuDefault = lazy(() => import("../examples/navigation-menu/default"));
const NavigationMenuWithDropdowns = lazy(
	() => import("../examples/navigation-menu/with-dropdowns"),
);
const NavigationMenuWithGridContent = lazy(
	() => import("../examples/navigation-menu/with-grid-content"),
);

import navigationMenuDefaultSource from "../examples/navigation-menu/default?raw";
import navigationMenuWithDropdownsSource from "../examples/navigation-menu/with-dropdowns?raw";
import navigationMenuWithGridContentSource from "../examples/navigation-menu/with-grid-content?raw";

// popover
const PopoverDefault = lazy(() => import("../examples/popover/default"));
const PopoverFormInside = lazy(() => import("../examples/popover/form-inside"));
const PopoverControlled = lazy(() => import("../examples/popover/controlled"));
const PopoverWithAnchor = lazy(() => import("../examples/popover/with-anchor"));

import popoverControlledSource from "../examples/popover/controlled?raw";
import popoverDefaultSource from "../examples/popover/default?raw";
import popoverFormInsideSource from "../examples/popover/form-inside?raw";
import popoverWithAnchorSource from "../examples/popover/with-anchor?raw";

// resizable
const ResizableDefault = lazy(() => import("../examples/resizable/default"));
const ResizableOrientations = lazy(() => import("../examples/resizable/orientations"));
const ResizableWithHandle = lazy(() => import("../examples/resizable/with-handle"));
const ResizableNestedPanels = lazy(() => import("../examples/resizable/nested-panels"));
const ResizableDefaultSizes = lazy(() => import("../examples/resizable/default-sizes"));

import resizableDefaultSource from "../examples/resizable/default?raw";
import resizableDefaultSizesSource from "../examples/resizable/default-sizes?raw";
import resizableNestedPanelsSource from "../examples/resizable/nested-panels?raw";
import resizableOrientationsSource from "../examples/resizable/orientations?raw";
import resizableWithHandleSource from "../examples/resizable/with-handle?raw";

// schema-form
const SchemaFormDefault = lazy(() => import("../examples/schema-form/default"));
const SchemaFormWithUiSchema = lazy(() => import("../examples/schema-form/with-ui-schema"));
const SchemaFormWithValidation = lazy(() => import("../examples/schema-form/with-validation"));
const SchemaFormNestedSchema = lazy(() => import("../examples/schema-form/nested-schema"));
const SchemaFormArrayField = lazy(() => import("../examples/schema-form/array-field"));

import schemaFormArrayFieldSource from "../examples/schema-form/array-field?raw";
import schemaFormDefaultSource from "../examples/schema-form/default?raw";
import schemaFormNestedSchemaSource from "../examples/schema-form/nested-schema?raw";
import schemaFormWithUiSchemaSource from "../examples/schema-form/with-ui-schema?raw";
import schemaFormWithValidationSource from "../examples/schema-form/with-validation?raw";

// select
const SelectDefault = lazy(() => import("../examples/select/default"));
const SelectWithGroups = lazy(() => import("../examples/select/with-groups"));
const SelectWithIconsInItems = lazy(() => import("../examples/select/with-icons-in-items"));
const SelectDisabled = lazy(() => import("../examples/select/disabled"));
const SelectControlled = lazy(() => import("../examples/select/controlled"));

import selectControlledSource from "../examples/select/controlled?raw";
import selectDefaultSource from "../examples/select/default?raw";
import selectDisabledSource from "../examples/select/disabled?raw";
import selectWithGroupsSource from "../examples/select/with-groups?raw";
import selectWithIconsInItemsSource from "../examples/select/with-icons-in-items?raw";

// sheet
const SheetDefault = lazy(() => import("../examples/sheet/default"));
const SheetSides = lazy(() => import("../examples/sheet/sides"));
const SheetFormInside = lazy(() => import("../examples/sheet/form-inside"));
const SheetControlled = lazy(() => import("../examples/sheet/controlled"));

import sheetControlledSource from "../examples/sheet/controlled?raw";
import sheetDefaultSource from "../examples/sheet/default?raw";
import sheetFormInsideSource from "../examples/sheet/form-inside?raw";
import sheetSidesSource from "../examples/sheet/sides?raw";

// sidebar
const SidebarDefault = lazy(() => import("../examples/sidebar/default"));
const SidebarSideRight = lazy(() => import("../examples/sidebar/side-right"));
const SidebarVariants = lazy(() => import("../examples/sidebar/variants"));
const SidebarCollapsibleIcon = lazy(() => import("../examples/sidebar/collapsible-icon"));
const SidebarCollapsibleOffcanvas = lazy(() => import("../examples/sidebar/collapsible-offcanvas"));
const SidebarWithGroups = lazy(() => import("../examples/sidebar/with-groups"));
const SidebarWithActiveItem = lazy(() => import("../examples/sidebar/with-active-item"));
const SidebarWithActions = lazy(() => import("../examples/sidebar/with-actions"));
const SidebarWithSkeleton = lazy(() => import("../examples/sidebar/with-skeleton"));
const SidebarAthenaPattern = lazy(() => import("../examples/sidebar/athena-pattern"));

import sidebarAthenaPatternSource from "../examples/sidebar/athena-pattern?raw";
import sidebarCollapsibleIconSource from "../examples/sidebar/collapsible-icon?raw";
import sidebarCollapsibleOffcanvasSource from "../examples/sidebar/collapsible-offcanvas?raw";
import sidebarDefaultSource from "../examples/sidebar/default?raw";
import sidebarSideRightSource from "../examples/sidebar/side-right?raw";
import sidebarVariantsSource from "../examples/sidebar/variants?raw";
import sidebarWithActionsSource from "../examples/sidebar/with-actions?raw";
import sidebarWithActiveItemSource from "../examples/sidebar/with-active-item?raw";
import sidebarWithGroupsSource from "../examples/sidebar/with-groups?raw";
import sidebarWithSkeletonSource from "../examples/sidebar/with-skeleton?raw";

// sonner
const SonnerDefault = lazy(() => import("../examples/sonner/default"));
const SonnerVariants = lazy(() => import("../examples/sonner/variants"));
const SonnerWithAction = lazy(() => import("../examples/sonner/with-action"));
const SonnerPromise = lazy(() => import("../examples/sonner/promise"));
const SonnerPosition = lazy(() => import("../examples/sonner/position"));

import sonnerDefaultSource from "../examples/sonner/default?raw";
import sonnerPositionSource from "../examples/sonner/position?raw";
import sonnerPromiseSource from "../examples/sonner/promise?raw";
import sonnerVariantsSource from "../examples/sonner/variants?raw";
import sonnerWithActionSource from "../examples/sonner/with-action?raw";

// tabs
const TabsDefault = lazy(() => import("../examples/tabs/default"));
const TabsControlled = lazy(() => import("../examples/tabs/controlled"));
const TabsOrientations = lazy(() => import("../examples/tabs/orientations"));
const TabsWithIcons = lazy(() => import("../examples/tabs/with-icons"));
const TabsDisabledTab = lazy(() => import("../examples/tabs/disabled-tab"));

import tabsControlledSource from "../examples/tabs/controlled?raw";
import tabsDefaultSource from "../examples/tabs/default?raw";
import tabsDisabledTabSource from "../examples/tabs/disabled-tab?raw";
import tabsOrientationsSource from "../examples/tabs/orientations?raw";
import tabsWithIconsSource from "../examples/tabs/with-icons?raw";

// theme-provider
const ThemeProviderDefault = lazy(() => import("../examples/theme-provider/default"));
const ThemeProviderSystem = lazy(() => import("../examples/theme-provider/system-theme"));

import themeProviderDefaultSource from "../examples/theme-provider/default?raw";
import themeProviderSystemSource from "../examples/theme-provider/system-theme?raw";

// =============================================================================
// TEMPLATES
// =============================================================================

// app-header
const AppHeaderDefault = lazy(() => import("../examples/app-header/default"));
const AppHeaderMinimal = lazy(() => import("../examples/app-header/minimal"));
const AppHeaderWithMobileMenu = lazy(() => import("../examples/app-header/with-mobile-menu"));

import appHeaderDefaultSource from "../examples/app-header/default?raw";
import appHeaderMinimalSource from "../examples/app-header/minimal?raw";
import appHeaderWithMobileMenuSource from "../examples/app-header/with-mobile-menu?raw";

// admin-shell
const AdminShellDefault = lazy(() => import("../examples/admin-shell/default"));
const AdminShellSidebarCollapsed = lazy(() => import("../examples/admin-shell/sidebar-collapsed"));
const AdminShellWithBreadcrumbs = lazy(() => import("../examples/admin-shell/with-breadcrumbs"));

import adminShellDefaultSource from "../examples/admin-shell/default?raw";
import adminShellSidebarCollapsedSource from "../examples/admin-shell/sidebar-collapsed?raw";
import adminShellWithBreadcrumbsSource from "../examples/admin-shell/with-breadcrumbs?raw";

// auth-shell
const AuthShellDefault = lazy(() => import("../examples/auth-shell/default"));
const AuthShellSignup = lazy(() => import("../examples/auth-shell/signup"));
const AuthShellWithError = lazy(() => import("../examples/auth-shell/with-error"));
const AuthShellWithOtpFlow = lazy(() => import("../examples/auth-shell/with-otp-flow"));

import authShellDefaultSource from "../examples/auth-shell/default?raw";
import authShellSignupSource from "../examples/auth-shell/signup?raw";
import authShellWithErrorSource from "../examples/auth-shell/with-error?raw";
import authShellWithOtpFlowSource from "../examples/auth-shell/with-otp-flow?raw";

// wizard-shell
const WizardShellDefault = lazy(() => import("../examples/wizard-shell/default"));
const WizardShellFiveStep = lazy(() => import("../examples/wizard-shell/5-step"));
const WizardShellWithValidation = lazy(() => import("../examples/wizard-shell/with-validation"));

import wizardShellFiveStepSource from "../examples/wizard-shell/5-step?raw";
import wizardShellDefaultSource from "../examples/wizard-shell/default?raw";
import wizardShellWithValidationSource from "../examples/wizard-shell/with-validation?raw";

export const COMPONENT_CONTENT: Record<string, ComponentContent> = {
	// =========================================================================
	// ATOMS
	// =========================================================================
	"aspect-ratio": {
		id: "aspect-ratio",
		tier: "atoms",
		displayName: "AspectRatio",
		propsSource: "atoms/aspect-ratio",
		importLine: `import { AspectRatio } from "@olympusoss/canvas";`,
		overview:
			"Locks a child to a fixed width/height ratio. Wraps Radix's AspectRatio primitive. Useful for media containers, video embeds, image placeholders.",
		tokens: ["--muted", "--border", "--radius"],
		propsOverride: {
			ratio: {
				description: "Numeric width/height ratio (e.g. 16/9, 1, 4/3). Width comes from the parent.",
				defaultValue: "1",
			},
			asChild: {
				description: "Render as a Radix Slot — pass children that already have a width.",
				defaultValue: "false",
			},
			children: { description: "Any element — img, video, svg, iframe, plain div." },
			className: { description: "Tailwind / CSS class names merged onto the root element." },
		},
		examples: [
			{
				id: "default",
				title: "Default",
				description:
					"Pass any numeric ratio. Width comes from the parent; height is derived from the ratio.",
				render: () => <AspectRatioDefault />,
				source: aspectRatioDefaultSource,
				filename: "AspectRatio.tsx",
			},
			{
				id: "ratios",
				title: "Common ratios",
				description: "Ultrawide, video, classic, square, portrait, mobile.",
				render: () => <AspectRatioRatios />,
				source: aspectRatioRatiosSource,
				filename: "AspectRatio.tsx",
			},
			{
				id: "with-image",
				title: "With media child",
				description: "AspectRatio works for any child — img, video, svg, iframe.",
				render: () => <AspectRatioWithImage />,
				source: aspectRatioWithImageSource,
				filename: "AspectRatio.tsx",
			},
		],
	},
	avatar: {
		id: "avatar",
		tier: "atoms",
		displayName: "Avatar",
		propsSource: "atoms/avatar",
		importLine: `import { Avatar, AvatarFallback, AvatarImage } from "@olympusoss/canvas";`,
		overview:
			"Compact circular profile mark. Avatar is the wrapper; AvatarImage loads the source URL; AvatarFallback renders when the image is missing or loading.",
		a11y: [
			"Always pair AvatarImage with an `alt` attribute describing the person.",
			"AvatarFallback should be initials or a short identifier — not just an icon.",
		],
		tokens: ["--muted", "--border"],
		examples: [
			{
				id: "default",
				title: "Image with fallback",
				description: "AvatarImage loads first; AvatarFallback shows on error or while loading.",
				render: () => <AvatarDefault />,
				source: avatarDefaultSource,
				filename: "Avatar.tsx",
			},
			{
				id: "fallback",
				title: "Fallback variants",
				description: "Style the fallback with any background — neutral, brand-tinted, inverted.",
				render: () => <AvatarFallback_ />,
				source: avatarFallbackSource,
				filename: "Avatar.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "Override h-/w- on Avatar; tweak text size on the fallback.",
				render: () => <AvatarSizes />,
				source: avatarSizesSource,
				filename: "Avatar.tsx",
			},
			{
				id: "stack",
				title: "Stacked group",
				description: "Negative margin + ring border for the classic overlap pattern.",
				render: () => <AvatarStack />,
				source: avatarStackSource,
				filename: "Avatar.tsx",
			},
			{
				id: "as-child",
				title: "As link",
				description: "Wrap Avatar in any anchor or interactive element.",
				render: () => <AvatarAsChild />,
				source: avatarAsChildSource,
				filename: "Avatar.tsx",
			},
		],
	},
	badge: {
		id: "badge",
		tier: "atoms",
		displayName: "Badge",
		propsSource: "atoms/badge",
		importLine: `import { Badge } from "@olympusoss/canvas";`,
		overview:
			"Small inline-flex pill for status, counts, and tags. Four variants (default, secondary, outline, destructive). Pair with a leading dot for status indicators.",
		tokens: ["--primary", "--secondary", "--accent", "--destructive", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <BadgeDefault />,
				source: badgeDefaultSource,
				filename: "Badge.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				render: () => <BadgeVariants />,
				source: badgeVariantsSource,
				filename: "Badge.tsx",
			},
			{
				id: "with-icon",
				title: "With icon",
				render: () => <BadgeWithIcon />,
				source: badgeWithIconSource,
				filename: "Badge.tsx",
			},
		],
	},
	button: {
		id: "button",
		tier: "atoms",
		displayName: "Button",
		propsSource: "atoms/button",
		importLine: `import { Button } from "@olympusoss/canvas";`,
		overview:
			"The primary action atom. Six variants (default, destructive, outline, secondary, ghost, link) and three sizes (default, sm, lg) plus an icon size. Wraps a Radix Slot when `asChild` is true so you can render any element with button styling — typically a Next.js Link.",
		a11y: [
			"Use `aria-label` on icon-only buttons (size='icon').",
			"focus-visible adds a 1px ring; do not remove.",
			"Disabled state is not focusable; prefer aria-disabled with onClick guard if you need keyboard reachability.",
		],
		tokens: [
			"--primary",
			"--primary-foreground",
			"--secondary",
			"--accent",
			"--destructive",
			"--ring",
			"--radius",
		],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ButtonDefault />,
				source: buttonDefaultSource,
				filename: "Button.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "Six variants for different action emphasis.",
				render: () => <ButtonVariants />,
				source: buttonVariantsSource,
				filename: "Button.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "sm / default / lg, plus an icon-only size.",
				render: () => <ButtonSizes />,
				source: buttonSizesSource,
				filename: "Button.tsx",
			},
			{
				id: "disabled",
				title: "Disabled",
				render: () => <ButtonDisabled />,
				source: buttonDisabledSource,
				filename: "Button.tsx",
			},
			{
				id: "with-icon",
				title: "With icon",
				render: () => <ButtonWithIcon />,
				source: buttonWithIconSource,
				filename: "Button.tsx",
			},
			{
				id: "as-child",
				title: "As link (asChild)",
				description:
					"Render as a Radix Slot — the Button forwards its className to the child anchor.",
				render: () => <ButtonAsChild />,
				source: buttonAsChildSource,
				filename: "Button.tsx",
			},
		],
	},
	checkbox: {
		id: "checkbox",
		tier: "atoms",
		displayName: "Checkbox",
		propsSource: "atoms/checkbox",
		importLine: `import { Checkbox } from "@olympusoss/canvas";`,
		overview:
			"Square Radix-backed checkbox with a built-in check indicator. Always pair with a `<Label htmlFor>` for accessibility. Supports unchecked / checked / indeterminate states.",
		a11y: [
			"Every checkbox needs an associated label.",
			"Use `checked=\"indeterminate\"` for tri-state filters or 'select all' rows.",
		],
		tokens: ["--primary", "--primary-foreground", "--border", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CheckboxDefault />,
				source: checkboxDefaultSource,
				filename: "Checkbox.tsx",
			},
			{
				id: "states",
				title: "States",
				description: "Unchecked / checked / indeterminate / disabled side-by-side.",
				render: () => <CheckboxStates />,
				source: checkboxStatesSource,
				filename: "Checkbox.tsx",
			},
		],
	},
	"flex-box": {
		id: "flex-box",
		tier: "atoms",
		displayName: "FlexBox",
		propsSource: "atoms/flex-box",
		importLine: `import { FlexBox } from "@olympusoss/canvas";`,
		overview:
			"Thin layout primitive over Tailwind's flex utilities. Maps `direction`, `align`, `justify`, `gap`, and `wrap` to the matching classes so layout intent stays in the JSX.",
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <FlexBoxDefault />,
				source: flexBoxDefaultSource,
				filename: "FlexBox.tsx",
			},
			{
				id: "directions",
				title: "Directions",
				description: "row / column.",
				render: () => <FlexBoxDirections />,
				source: flexBoxDirectionsSource,
				filename: "FlexBox.tsx",
			},
			{
				id: "alignment",
				title: "Alignment",
				description: "Cross-axis (`align`) — flex-start / center / flex-end / stretch / baseline.",
				render: () => <FlexBoxAlignment />,
				source: flexBoxAlignmentSource,
				filename: "FlexBox.tsx",
			},
			{
				id: "justification",
				title: "Justification",
				description:
					"Main-axis (`justify`) — flex-start / center / flex-end / space-between / space-around / space-evenly.",
				render: () => <FlexBoxJustification />,
				source: flexBoxJustificationSource,
				filename: "FlexBox.tsx",
			},
			{
				id: "wrap",
				title: "Wrap",
				render: () => <FlexBoxWrap />,
				source: flexBoxWrapSource,
				filename: "FlexBox.tsx",
			},
		],
	},
	icon: {
		id: "icon",
		tier: "atoms",
		displayName: "Icon",
		propsSource: "atoms/icon",
		importLine: `import { Icon } from "@olympusoss/canvas";`,
		overview:
			"Lookup-by-name wrapper around `lucide-react`. Pass any icon name (PascalCase) as `name`; size defaults to 16. Inherits color from `currentColor`.",
		a11y: [
			"Decorative icons should have `aria-hidden`; meaningful icons need an `aria-label` on the parent button.",
		],
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <IconDefault />,
				source: iconDefaultSource,
				filename: "Icon.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "Size in pixels — 12, 16 (default), 20, 24, 32, 48.",
				render: () => <IconSizes />,
				source: iconSizesSource,
				filename: "Icon.tsx",
			},
		],
	},
	input: {
		id: "input",
		tier: "atoms",
		displayName: "Input",
		propsSource: "atoms/input",
		importLine: `import { Input, Label } from "@olympusoss/canvas";`,
		overview:
			"Text input atom. Always pair with a `<Label>` for a11y. Supports every standard `<input>` HTML attribute via prop spread.",
		a11y: [
			"Every input must have an associated label (`htmlFor`/`id` or wrapping Label).",
			"Use `aria-invalid` to signal validation state to screen readers.",
		],
		tokens: ["--input", "--background", "--foreground", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <InputDefault />,
				source: inputDefaultSource,
				filename: "Input.tsx",
			},
			{
				id: "types",
				title: "Types",
				description: "text / email / password / number / date.",
				render: () => <InputTypes />,
				source: inputTypesSource,
				filename: "Input.tsx",
			},
			{
				id: "states",
				title: "States",
				description: "Default / disabled / read-only / error.",
				render: () => <InputStates />,
				source: inputStatesSource,
				filename: "Input.tsx",
			},
		],
	},
	label: {
		id: "label",
		tier: "atoms",
		displayName: "Label",
		propsSource: "atoms/label",
		importLine: `import { Label } from "@olympusoss/canvas";`,
		overview:
			"Accessible form label. Wraps Radix's Label primitive — clicking the label focuses the bound control via `htmlFor`.",
		a11y: ["Always provide `htmlFor` matching the control's `id`, or wrap the control as a child."],
		tokens: ["--foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				description: "Label paired with an Input via `htmlFor`.",
				render: () => <LabelDefault />,
				source: labelDefaultSource,
				filename: "Label.tsx",
			},
		],
	},
	"brand-mark": {
		id: "brand-mark",
		tier: "atoms",
		displayName: "BrandMark",
		propsSource: "atoms/brand-mark",
		importLine: `import { BrandMark } from "@olympusoss/canvas";`,
		overview:
			"Brand-neutral SVG primitive. You supply the `path` (and optionally a `viewBox`/`transform`); the component handles `className`-based sizing and an optional two-stop linear gradient via `from`/`to`. Apps usually wrap this once with their own brand path baked in.",
		a11y: [
			"Pass `aria-label` (or wrap with a hidden label) when the mark conveys meaning rather than being purely decorative.",
		],
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				description:
					"Single path filled with `currentColor` — recolour by setting `text-*` on the className.",
				render: () => <BrandMarkDefault />,
				source: brandMarkDefaultSource,
				filename: "BrandMark.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "Sizing is controlled by `h-*`/`w-*` utilities on the className.",
				render: () => <BrandMarkSizes />,
				source: brandMarkSizesSource,
				filename: "BrandMark.tsx",
			},
			{
				id: "with-gradient",
				title: "With gradient",
				description:
					"Pass both `from` and `to` colours to fill the path with a two-stop linear gradient.",
				render: () => <BrandMarkWithGradient />,
				source: brandMarkWithGradientSource,
				filename: "BrandMark.tsx",
			},
		],
	},
	progress: {
		id: "progress",
		tier: "atoms",
		displayName: "Progress",
		propsSource: "atoms/progress",
		importLine: `import { Progress } from "@olympusoss/canvas";`,
		overview:
			"Linear progress indicator. Pass `value` (0–100) for determinate progress; omit for an indeterminate animation.",
		a11y: ["Pair with a visible label — Radix sets `aria-valuenow` from `value`."],
		tokens: ["--primary", "--secondary"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ProgressDefault />,
				source: progressDefaultSource,
				filename: "Progress.tsx",
			},
			{
				id: "states",
				title: "Values",
				description: "0% / 25% / 50% / 75% / 100% in one frame.",
				render: () => <ProgressStates />,
				source: progressStatesSource,
				filename: "Progress.tsx",
			},
		],
	},
	"radio-group": {
		id: "radio-group",
		tier: "atoms",
		displayName: "RadioGroup",
		propsSource: "atoms/radio-group",
		importLine: `import { RadioGroup, RadioGroupItem } from "@olympusoss/canvas";`,
		overview:
			"Mutually-exclusive choice. Each `<RadioGroupItem>` is a Radix radio with a circular indicator. Default layout is vertical via `space-y` from the wrapper.",
		a11y: ["Each item needs a unique `id` plus a paired `<Label htmlFor>`."],
		tokens: ["--primary", "--border", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <RadioGroupDefault />,
				source: radioGroupDefaultSource,
				filename: "RadioGroup.tsx",
			},
			{
				id: "disabled",
				title: "Disabled item",
				render: () => <RadioGroupDisabled />,
				source: radioGroupDisabledSource,
				filename: "RadioGroup.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				description: "Stack vertically by default; lay out horizontally with `flex` on the group.",
				render: () => <RadioGroupOrientations />,
				source: radioGroupOrientationsSource,
				filename: "RadioGroup.tsx",
			},
		],
	},
	"scroll-area": {
		id: "scroll-area",
		tier: "atoms",
		displayName: "ScrollArea",
		propsSource: "atoms/scroll-area",
		importLine: `import { ScrollArea, ScrollBar } from "@olympusoss/canvas";`,
		overview:
			'Custom-scrollbar container that overlays a thin Radix scrollbar over native scroll. Default scrollbar is vertical; add `<ScrollBar orientation="horizontal" />` for horizontal scroll.',
		tokens: ["--border", "--muted"],
		examples: [
			{
				id: "default",
				title: "Default (vertical)",
				render: () => <ScrollAreaDefault />,
				source: scrollAreaDefaultSource,
				filename: "ScrollArea.tsx",
			},
			{
				id: "horizontal",
				title: "Horizontal",
				render: () => <ScrollAreaHorizontal />,
				source: scrollAreaHorizontalSource,
				filename: "ScrollArea.tsx",
			},
		],
	},
	section: {
		id: "section",
		tier: "atoms",
		displayName: "Section",
		propsSource: "atoms/section",
		importLine: `import { Section } from "@olympusoss/canvas";`,
		overview:
			"Layout primitive that maps a `spacing` step (0–6) to Tailwind `space-y-*` so vertical rhythm stays consistent across content blocks.",
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SectionDefault />,
				source: sectionDefaultSource,
				filename: "Section.tsx",
			},
			{
				id: "spacings",
				title: "Spacings",
				description: "spacing 0 (none) up to 6 (3rem).",
				render: () => <SectionSpacings />,
				source: sectionSpacingsSource,
				filename: "Section.tsx",
			},
		],
	},
	separator: {
		id: "separator",
		tier: "atoms",
		displayName: "Separator",
		propsSource: "atoms/separator",
		importLine: `import { Separator } from "@olympusoss/canvas";`,
		overview:
			'Thin horizontal or vertical divider. Wraps Radix\'s Separator primitive — sets `role="separator"` automatically when `decorative` is false.',
		a11y: [
			"Use `decorative` (default) for visual-only dividers; otherwise expose `aria-orientation`.",
		],
		tokens: ["--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SeparatorDefault />,
				source: separatorDefaultSource,
				filename: "Separator.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <SeparatorOrientations />,
				source: separatorOrientationsSource,
				filename: "Separator.tsx",
			},
		],
	},
	skeleton: {
		id: "skeleton",
		tier: "atoms",
		displayName: "Skeleton",
		propsSource: "atoms/skeleton",
		importLine: `import { Skeleton } from "@olympusoss/canvas";`,
		overview:
			"Pulsing placeholder for loading content. Style dimensions via `className` (`h-`/`w-`/`rounded-*`) so it matches the eventual content shape.",
		tokens: ["--muted"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SkeletonDefault />,
				source: skeletonDefaultSource,
				filename: "Skeleton.tsx",
			},
			{
				id: "shapes",
				title: "Shapes",
				description: "Avatar circle, text lines, button rectangle — combine to match any layout.",
				render: () => <SkeletonShapes />,
				source: skeletonShapesSource,
				filename: "Skeleton.tsx",
			},
		],
	},
	slider: {
		id: "slider",
		tier: "atoms",
		displayName: "Slider",
		propsSource: "atoms/slider",
		importLine: `import { Slider } from "@olympusoss/canvas";`,
		overview:
			"Single or range slider over Radix's Slider primitive. Pass an array to `defaultValue`/`value` — one number for single, two numbers for a range.",
		tokens: ["--primary", "--secondary"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SliderDefault />,
				source: sliderDefaultSource,
				filename: "Slider.tsx",
			},
			{
				id: "range",
				title: "Range",
				description: "Two-thumb range — pass `[min, max]` as the value.",
				render: () => <SliderRange />,
				source: sliderRangeSource,
				filename: "Slider.tsx",
			},
			{
				id: "with-step",
				title: "Step",
				description: "`step` snaps the thumb to discrete increments.",
				render: () => <SliderWithStep />,
				source: sliderWithStepSource,
				filename: "Slider.tsx",
			},
		],
	},
	switch: {
		id: "switch",
		tier: "atoms",
		displayName: "Switch",
		propsSource: "atoms/switch",
		importLine: `import { Switch } from "@olympusoss/canvas";`,
		overview:
			"Binary on/off toggle for settings. Pair with a `<Label htmlFor>` so screen readers announce the purpose.",
		a11y: ["Switch always pairs with a label; the label can sit on either side."],
		tokens: ["--primary", "--input", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SwitchDefault />,
				source: switchDefaultSource,
				filename: "Switch.tsx",
			},
			{
				id: "states",
				title: "States",
				render: () => <SwitchStates />,
				source: switchStatesSource,
				filename: "Switch.tsx",
			},
		],
	},
	textarea: {
		id: "textarea",
		tier: "atoms",
		displayName: "Textarea",
		propsSource: "atoms/textarea",
		importLine: `import { Textarea, Label } from "@olympusoss/canvas";`,
		overview: "Multi-line text input. Standard `<textarea>` props pass through.",
		a11y: ["Pair with a `<Label htmlFor>`; use `aria-invalid` to flag validation errors."],
		tokens: ["--input", "--background", "--foreground", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <TextareaDefault />,
				source: textareaDefaultSource,
				filename: "Textarea.tsx",
			},
			{
				id: "states",
				title: "States",
				description: "Default / disabled / read-only / error.",
				render: () => <TextareaStates />,
				source: textareaStatesSource,
				filename: "Textarea.tsx",
			},
			{
				id: "sizes",
				title: "Rows",
				description: "Use `rows` to set the initial visible height.",
				render: () => <TextareaSizes />,
				source: textareaSizesSource,
				filename: "Textarea.tsx",
			},
		],
	},
	toggle: {
		id: "toggle",
		tier: "atoms",
		displayName: "Toggle",
		propsSource: "atoms/toggle",
		importLine: `import { Toggle } from "@olympusoss/canvas";`,
		overview:
			"Two-state toggle button — useful for formatting toolbars and persistent on/off states. Two visual variants and three sizes.",
		a11y: ["Provide an `aria-label` since icon-only toggles have no visible text."],
		tokens: ["--accent", "--accent-foreground", "--input", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ToggleDefault />,
				source: toggleDefaultSource,
				filename: "Toggle.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "default (transparent) vs outline (bordered).",
				render: () => <ToggleVariants />,
				source: toggleVariantsSource,
				filename: "Toggle.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				render: () => <ToggleSizes />,
				source: toggleSizesSource,
				filename: "Toggle.tsx",
			},
			{
				id: "states",
				title: "States",
				render: () => <ToggleStates />,
				source: toggleStatesSource,
				filename: "Toggle.tsx",
			},
		],
	},

	// =========================================================================
	// MOLECULES
	// =========================================================================
	"action-bar": {
		id: "action-bar",
		tier: "molecules",
		displayName: "ActionBar",
		propsSource: "molecules/action-bar",
		importLine: `import { ActionBar } from "@olympusoss/canvas";`,
		overview:
			"Footer action group used at the bottom of dialogs, drawers, and forms. Pass a `primaryAction` and zero or more `secondaryActions`; control horizontal placement with `align`.",
		tokens: ["--primary", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ActionBarDefault />,
				source: actionBarDefaultSource,
				filename: "ActionBar.tsx",
			},
			{
				id: "alignment",
				title: "Alignment",
				description: "left / center / right / space-between.",
				render: () => <ActionBarAlignment />,
				source: actionBarAlignmentSource,
				filename: "ActionBar.tsx",
			},
		],
	},
	alert: {
		id: "alert",
		tier: "molecules",
		displayName: "Alert",
		propsSource: "molecules/alert",
		importLine: `import { Alert, AlertDescription, AlertTitle } from "@olympusoss/canvas";`,
		overview:
			"Inline informational or destructive message. Compose with `<AlertTitle>` and `<AlertDescription>`; place an icon as the first child for the auto-aligned grid.",
		tokens: ["--background", "--destructive", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AlertDefault />,
				source: alertDefaultSource,
				filename: "Alert.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "default / destructive.",
				render: () => <AlertVariants />,
				source: alertVariantsSource,
				filename: "Alert.tsx",
			},
			{
				id: "with-icon",
				title: "With icon",
				render: () => <AlertWithIcon />,
				source: alertWithIconSource,
				filename: "Alert.tsx",
			},
			{
				id: "with-action",
				title: "With trailing action",
				render: () => <AlertWithAction />,
				source: alertWithActionSource,
				filename: "Alert.tsx",
			},
		],
	},
	"animated-background": {
		id: "animated-background",
		tier: "molecules",
		displayName: "AnimatedBackground",
		propsSource: "molecules/animated-background",
		importLine: `import { AnimatedBackground } from "@olympusoss/canvas";`,
		overview:
			"Decorative full-bleed background of soft animated orbs. Render once near the page root; the default 3-orb composition matches Olympus's auth background.",
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AnimatedBackgroundDefault />,
				source: animatedBackgroundDefaultSource,
				filename: "AnimatedBackground.tsx",
			},
			{
				id: "custom-orbs",
				title: "Custom orbs",
				description: "Pass your own `orbs[]` array — color, size, blur, position, animation.",
				render: () => <AnimatedBackgroundCustomOrbs />,
				source: animatedBackgroundCustomOrbsSource,
				filename: "AnimatedBackground.tsx",
			},
		],
	},
	breadcrumb: {
		id: "breadcrumb",
		tier: "molecules",
		displayName: "Breadcrumb",
		propsSource: "molecules/breadcrumb",
		importLine: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@olympusoss/canvas";`,
		overview:
			"Compound nav element. Compose with `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage` (the current/non-link node), and `BreadcrumbSeparator` between items.",
		tokens: ["--foreground", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <BreadcrumbDefault />,
				source: breadcrumbDefaultSource,
				filename: "Breadcrumb.tsx",
			},
			{
				id: "with-ellipsis",
				title: "With ellipsis",
				render: () => <BreadcrumbWithEllipsis />,
				source: breadcrumbWithEllipsisSource,
				filename: "Breadcrumb.tsx",
			},
			{
				id: "custom-separator",
				title: "Custom separator",
				render: () => <BreadcrumbCustomSeparator />,
				source: breadcrumbCustomSeparatorSource,
				filename: "Breadcrumb.tsx",
			},
		],
	},
	"button-group": {
		id: "button-group",
		tier: "molecules",
		displayName: "ButtonGroup",
		propsSource: "molecules/button-group",
		importLine: `import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@olympusoss/canvas";`,
		overview:
			"Horizontally or vertically joined Button cluster. Children share borders so the group looks like one cohesive control.",
		tokens: ["--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ButtonGroupDefault />,
				source: buttonGroupDefaultSource,
				filename: "ButtonGroup.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <ButtonGroupOrientations />,
				source: buttonGroupOrientationsSource,
				filename: "ButtonGroup.tsx",
			},
			{
				id: "with-text",
				title: "With separator and text",
				render: () => <ButtonGroupWithText />,
				source: buttonGroupWithTextSource,
				filename: "ButtonGroup.tsx",
			},
		],
	},
	calendar: {
		id: "calendar",
		tier: "molecules",
		displayName: "Calendar",
		propsSource: "molecules/calendar",
		importLine: `import { Calendar } from "@olympusoss/canvas";`,
		overview:
			"Date picker built on `react-day-picker`. Pick a `mode`: `single`, `range`, or `multiple`. The chrome (nav buttons) inherits a `Button` variant via `buttonVariant`.",
		tokens: ["--primary", "--muted", "--accent", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CalendarDefault />,
				source: calendarDefaultSource,
				filename: "Calendar.tsx",
			},
			{
				id: "range",
				title: "Range",
				description: '`mode="range"` with `from`/`to` selection.',
				render: () => <CalendarRange />,
				source: calendarRangeSource,
				filename: "Calendar.tsx",
			},
			{
				id: "multiple",
				title: "Multiple",
				description: '`mode="multiple"` — pick any number of disjoint days.',
				render: () => <CalendarMultiple />,
				source: calendarMultipleSource,
				filename: "Calendar.tsx",
			},
			{
				id: "button-variants",
				title: "buttonVariant",
				description: "Override the chrome button styling.",
				render: () => <CalendarButtonVariants />,
				source: calendarButtonVariantsSource,
				filename: "Calendar.tsx",
			},
			{
				id: "disabled-past",
				title: "Block past dates",
				description: "Pass `disabled={{ before: today }}` to block any date earlier than today.",
				render: () => <CalendarDisabledPast />,
				source: calendarDisabledPastSource,
				filename: "Calendar.tsx",
			},
			{
				id: "dropdown-caption",
				title: "Month + year dropdowns",
				description:
					'`captionLayout="dropdown"` makes the month and year clickable so users can jump quickly.',
				render: () => <CalendarDropdownCaption />,
				source: calendarDropdownCaptionSource,
				filename: "Calendar.tsx",
			},
			{
				id: "default-month",
				title: "Default month",
				description:
					"`defaultMonth` opens on a specific month without controlling navigation state.",
				render: () => <CalendarDefaultMonth />,
				source: calendarDefaultMonthSource,
				filename: "Calendar.tsx",
			},
			{
				id: "multiple-months",
				title: "Multiple months side-by-side",
				description: "`numberOfMonths={2}` + `pagedNavigation` is the standard date-range UX.",
				render: () => <CalendarMultipleMonths />,
				source: calendarMultipleMonthsSource,
				filename: "Calendar.tsx",
			},
			{
				id: "fixed-weeks",
				title: "Fixed weeks",
				description: "Always render 6 rows so the layout never reflows when navigating.",
				render: () => <CalendarFixedWeeks />,
				source: calendarFixedWeeksSource,
				filename: "Calendar.tsx",
			},
			{
				id: "week-numbers",
				title: "Week numbers",
				render: () => <CalendarWeekNumbers />,
				source: calendarWeekNumbersSource,
				filename: "Calendar.tsx",
			},
			{
				id: "iso-week",
				title: "ISO 8601 week",
				description: "Monday-first + ISO week numbering.",
				render: () => <CalendarIsoWeek />,
				source: calendarIsoWeekSource,
				filename: "Calendar.tsx",
			},
			{
				id: "week-starts-monday",
				title: "Custom week start",
				description: "`weekStartsOn` accepts 0 (Sun) – 6 (Sat).",
				render: () => <CalendarWeekStartsMonday />,
				source: calendarWeekStartsMondaySource,
				filename: "Calendar.tsx",
			},
			{
				id: "selection-limits",
				title: "Min / max selection",
				description: "Cap how many days `multiple` mode allows.",
				render: () => <CalendarSelectionLimits />,
				source: calendarSelectionLimitsSource,
				filename: "Calendar.tsx",
			},
			{
				id: "required",
				title: "Required selection",
				description: "`required` blocks the user from clearing the active date.",
				render: () => <CalendarRequired />,
				source: calendarRequiredSource,
				filename: "Calendar.tsx",
			},
			{
				id: "hide-navigation",
				title: "Hide navigation",
				render: () => <CalendarHideNavigation />,
				source: calendarHideNavigationSource,
				filename: "Calendar.tsx",
			},
			{
				id: "custom-modifiers",
				title: "Custom modifiers",
				description: "Flag arbitrary days with your own classes (booked, holiday, …).",
				render: () => <CalendarCustomModifiers />,
				source: calendarCustomModifiersSource,
				filename: "Calendar.tsx",
			},
			{
				id: "with-footer",
				title: "With footer",
				description: "`footer` slot accepts any ReactNode — perfect for a selection readout.",
				render: () => <CalendarWithFooter />,
				source: calendarWithFooterSource,
				filename: "Calendar.tsx",
			},
			{
				id: "localized",
				title: "Localized (date-fns)",
				description: "Pass any `date-fns` locale via the `locale` prop.",
				render: () => <CalendarLocalized />,
				source: calendarLocalizedSource,
				filename: "Calendar.tsx",
			},
			{
				id: "controlled-month",
				title: "Controlled month",
				description:
					"`month` + `onMonthChange` lets you drive navigation from outside the calendar.",
				render: () => <CalendarControlledMonth />,
				source: calendarControlledMonthSource,
				filename: "Calendar.tsx",
			},
		],
	},
	card: {
		id: "card",
		tier: "molecules",
		displayName: "Card",
		propsSource: "molecules/card",
		importLine: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@olympusoss/canvas";`,
		overview:
			"Compound molecule. Use Card + CardHeader (with CardTitle / CardDescription) + CardContent + CardFooter to compose a self-contained surface.",
		tokens: ["--card", "--card-foreground", "--border", "--radius"],
		examples: [
			{
				id: "default",
				title: "With header, content, and footer",
				render: () => <CardDefault />,
				source: cardDefaultSource,
				filename: "Card.tsx",
			},
			{
				id: "with-footer",
				title: "Pricing card",
				render: () => <CardWithFooter />,
				source: cardWithFooterSource,
				filename: "Card.tsx",
			},
			{
				id: "with-image",
				title: "With image header",
				render: () => <CardWithImage />,
				source: cardWithImageSource,
				filename: "Card.tsx",
			},
		],
	},
	"code-block": {
		id: "code-block",
		tier: "molecules",
		displayName: "CodeBlock",
		propsSource: "molecules/code-block",
		importLine: `import { CodeBlock } from "@olympusoss/canvas";`,
		overview:
			"Static code surface with an optional copy-to-clipboard button and language label. For docs prose, prefer the docs-only `<DocsCodeBlock>` (Shiki-highlighted).",
		tokens: ["--muted", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CodeBlockDefault />,
				source: codeBlockDefaultSource,
				filename: "CodeBlock.tsx",
			},
			{
				id: "languages",
				title: "Languages",
				description: "Free-form `language` label — the block doesn't tokenize.",
				render: () => <CodeBlockLanguages />,
				source: codeBlockLanguagesSource,
				filename: "CodeBlock.tsx",
			},
			{
				id: "without-copy",
				title: "Without copy button",
				render: () => <CodeBlockWithoutCopy />,
				source: codeBlockWithoutCopySource,
				filename: "CodeBlock.tsx",
			},
		],
	},
	"empty-state": {
		id: "empty-state",
		tier: "molecules",
		displayName: "EmptyState",
		propsSource: "molecules/empty-state",
		importLine: `import { EmptyState } from "@olympusoss/canvas";`,
		overview:
			"Centered empty-list placeholder with optional icon, message, description, and CTA. Drop inside any container.",
		tokens: ["--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <EmptyStateDefault />,
				source: emptyStateDefaultSource,
				filename: "EmptyState.tsx",
			},
			{
				id: "with-action",
				title: "With action",
				render: () => <EmptyStateWithAction />,
				source: emptyStateWithActionSource,
				filename: "EmptyState.tsx",
			},
			{
				id: "minimal",
				title: "Minimal",
				render: () => <EmptyStateMinimal />,
				source: emptyStateMinimalSource,
				filename: "EmptyState.tsx",
			},
			{
				id: "with-illustration",
				title: "With custom illustration",
				render: () => <EmptyStateWithIllustration />,
				source: emptyStateWithIllustrationSource,
				filename: "EmptyState.tsx",
			},
		],
	},
	"error-state": {
		id: "error-state",
		tier: "molecules",
		displayName: "ErrorState",
		propsSource: "molecules/error-state",
		importLine: `import { ErrorState } from "@olympusoss/canvas";`,
		overview:
			"Centered error placeholder with a destructive icon, message, and optional retry handler. Use inside `SectionCard`s, dialogs, or any failed-load container.",
		tokens: ["--destructive", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ErrorStateDefault />,
				source: errorStateDefaultSource,
				filename: "ErrorState.tsx",
			},
			{
				id: "with-retry",
				title: "With retry",
				render: () => <ErrorStateWithRetry />,
				source: errorStateWithRetrySource,
				filename: "ErrorState.tsx",
			},
			{
				id: "minimal",
				title: "Minimal",
				render: () => <ErrorStateMinimal />,
				source: errorStateMinimalSource,
				filename: "ErrorState.tsx",
			},
		],
	},
	"field-display": {
		id: "field-display",
		tier: "molecules",
		displayName: "FieldDisplay",
		propsSource: "molecules/field-display",
		importLine: `import { FieldDisplay } from "@olympusoss/canvas";`,
		overview:
			"Read-only label/value pair using semantic `<dt>`/`<dd>`. Toggle `mono` for IDs and tokens; missing values render an em-dash automatically.",
		tokens: ["--muted-foreground", "--foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <FieldDisplayDefault />,
				source: fieldDisplayDefaultSource,
				filename: "FieldDisplay.tsx",
			},
			{
				id: "mono",
				title: "Monospace",
				render: () => <FieldDisplayMono />,
				source: fieldDisplayMonoSource,
				filename: "FieldDisplay.tsx",
			},
			{
				id: "missing",
				title: "Missing values",
				render: () => <FieldDisplayMissing />,
				source: fieldDisplayMissingSource,
				filename: "FieldDisplay.tsx",
			},
		],
	},
	"input-otp": {
		id: "input-otp",
		tier: "molecules",
		displayName: "InputOTP",
		propsSource: "molecules/input-otp",
		importLine: `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@olympusoss/canvas";`,
		overview:
			"OTP / verification-code input built on the `input-otp` library. Compose with `InputOTPGroup` blocks of `InputOTPSlot`s, optionally split by `InputOTPSeparator`.",
		tokens: ["--input", "--ring", "--border"],
		examples: [
			{
				id: "default",
				title: "Default (6 digits)",
				render: () => <InputOTPDefault />,
				source: inputOTPDefaultSource,
				filename: "InputOTP.tsx",
			},
			{
				id: "with-separator",
				title: "With separator",
				render: () => <InputOTPWithSeparator />,
				source: inputOTPWithSeparatorSource,
				filename: "InputOTP.tsx",
			},
			{
				id: "password-pattern",
				title: "Numeric-only PIN",
				render: () => <InputOTPPasswordPattern />,
				source: inputOTPPasswordPatternSource,
				filename: "InputOTP.tsx",
			},
		],
	},
	"loading-state": {
		id: "loading-state",
		tier: "molecules",
		displayName: "LoadingState",
		propsSource: "molecules/loading-state",
		importLine: `import { LoadingState } from "@olympusoss/canvas";`,
		overview:
			"Centered spinner with optional caption. Use as the body of a card or section while data is loading.",
		tokens: ["--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <LoadingStateDefault />,
				source: loadingStateDefaultSource,
				filename: "LoadingState.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				render: () => <LoadingStateSizes />,
				source: loadingStateSizesSource,
				filename: "LoadingState.tsx",
			},
			{
				id: "without-message",
				title: "Without message",
				render: () => <LoadingStateWithoutMessage />,
				source: loadingStateWithoutMessageSource,
				filename: "LoadingState.tsx",
			},
		],
	},
	"page-header": {
		id: "page-header",
		tier: "molecules",
		displayName: "PageHeader",
		propsSource: "molecules/page-header",
		importLine: `import { PageHeader } from "@olympusoss/canvas";`,
		overview:
			"Top-of-page title block with optional icon, subtitle, breadcrumbs, and right-aligned action slot. Pass `linkComponent` to use Next.js / React Router for breadcrumb anchors.",
		tokens: ["--foreground", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PageHeaderDefault />,
				source: pageHeaderDefaultSource,
				filename: "PageHeader.tsx",
			},
			{
				id: "with-icon",
				title: "With icon",
				render: () => <PageHeaderWithIcon />,
				source: pageHeaderWithIconSource,
				filename: "PageHeader.tsx",
			},
			{
				id: "with-actions",
				title: "With actions",
				render: () => <PageHeaderWithActions />,
				source: pageHeaderWithActionsSource,
				filename: "PageHeader.tsx",
			},
			{
				id: "with-breadcrumbs",
				title: "With breadcrumbs",
				render: () => <PageHeaderWithBreadcrumbs />,
				source: pageHeaderWithBreadcrumbsSource,
				filename: "PageHeader.tsx",
			},
			{
				id: "with-subtitle",
				title: "With subtitle",
				render: () => <PageHeaderWithSubtitle />,
				source: pageHeaderWithSubtitleSource,
				filename: "PageHeader.tsx",
			},
		],
	},
	"page-tabs": {
		id: "page-tabs",
		tier: "molecules",
		displayName: "PageTabs",
		propsSource: "molecules/page-tabs",
		importLine: `import { PageTabs } from "@olympusoss/canvas";`,
		overview:
			"Top-of-section tab strip — controlled. Pass `tabs[]` (each with `value` + `label` and optional `icon`/`badge`) and a `value` + `onChange` pair.",
		tokens: ["--accent", "--accent-foreground", "--primary", "--muted"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PageTabsDefault />,
				source: pageTabsDefaultSource,
				filename: "PageTabs.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "default / pills / underline.",
				render: () => <PageTabsVariants />,
				source: pageTabsVariantsSource,
				filename: "PageTabs.tsx",
			},
			{
				id: "with-icons",
				title: "With icons",
				render: () => <PageTabsWithIcons />,
				source: pageTabsWithIconsSource,
				filename: "PageTabs.tsx",
			},
			{
				id: "with-badges",
				title: "With badges",
				render: () => <PageTabsWithBadges />,
				source: pageTabsWithBadgesSource,
				filename: "PageTabs.tsx",
			},
		],
	},
	pagination: {
		id: "pagination",
		tier: "molecules",
		displayName: "Pagination",
		propsSource: "molecules/pagination",
		importLine: `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@olympusoss/canvas";`,
		overview:
			"Compound nav for page numbers. Mark the current page on a `PaginationLink` with `isActive`. Use `PaginationEllipsis` to gap long ranges.",
		tokens: ["--accent", "--accent-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PaginationDefault />,
				source: paginationDefaultSource,
				filename: "Pagination.tsx",
			},
			{
				id: "with-ellipsis",
				title: "With ellipsis",
				render: () => <PaginationWithEllipsis />,
				source: paginationWithEllipsisSource,
				filename: "Pagination.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				render: () => <PaginationSizes />,
				source: paginationSizesSource,
				filename: "Pagination.tsx",
			},
		],
	},
	"phone-input": {
		id: "phone-input",
		tier: "molecules",
		displayName: "PhoneInput",
		propsSource: "molecules/phone-input",
		importLine: `import { PhoneInput } from "@olympusoss/canvas";`,
		overview:
			"Country-aware phone input over `libphonenumber-js`. Emits E.164 strings via `onChange`; surface validation through `onValidityChange`. Restrict to a country subset with `countryCodes`.",
		tokens: ["--input", "--background", "--foreground", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PhoneInputDefault />,
				source: phoneInputDefaultSource,
				filename: "PhoneInput.tsx",
			},
			{
				id: "with-validation",
				title: "With validation",
				render: () => <PhoneInputWithValidation />,
				source: phoneInputWithValidationSource,
				filename: "PhoneInput.tsx",
			},
			{
				id: "restricted-countries",
				title: "Restricted country list",
				render: () => <PhoneInputRestrictedCountries />,
				source: phoneInputRestrictedCountriesSource,
				filename: "PhoneInput.tsx",
			},
			{
				id: "disabled",
				title: "Disabled",
				render: () => <PhoneInputDisabled />,
				source: phoneInputDisabledSource,
				filename: "PhoneInput.tsx",
			},
		],
	},
	"search-bar": {
		id: "search-bar",
		tier: "molecules",
		displayName: "SearchBar",
		propsSource: "molecules/search-bar",
		importLine: `import { SearchBar } from "@olympusoss/canvas";`,
		overview:
			"Controlled text input with leading search icon and trailing clear button. The clear button only appears when the value is non-empty.",
		tokens: ["--input", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SearchBarDefault />,
				source: searchBarDefaultSource,
				filename: "SearchBar.tsx",
			},
			{
				id: "with-clear",
				title: "With clear handler",
				render: () => <SearchBarWithClear />,
				source: searchBarWithClearSource,
				filename: "SearchBar.tsx",
			},
			{
				id: "disabled",
				title: "Disabled",
				render: () => <SearchBarDisabled />,
				source: searchBarDisabledSource,
				filename: "SearchBar.tsx",
			},
		],
	},
	"secret-field": {
		id: "secret-field",
		tier: "molecules",
		displayName: "SecretField",
		propsSource: "molecules/secret-field",
		importLine: `import { SecretField } from "@olympusoss/canvas";`,
		overview:
			"Password-style input with a reveal toggle, async validation, and inline status. Use for API tokens, secrets, or any value that needs validation before save.",
		tokens: ["--input", "--ring", "--destructive"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SecretFieldDefault />,
				source: secretFieldDefaultSource,
				filename: "SecretField.tsx",
			},
			{
				id: "with-validation",
				title: "With async validation",
				render: () => <SecretFieldWithValidation />,
				source: secretFieldWithValidationSource,
				filename: "SecretField.tsx",
			},
			{
				id: "revealable",
				title: "Reveal toggle",
				render: () => <SecretFieldRevealable />,
				source: secretFieldRevealableSource,
				filename: "SecretField.tsx",
			},
		],
	},
	"section-card": {
		id: "section-card",
		tier: "molecules",
		displayName: "SectionCard",
		propsSource: "molecules/section-card",
		importLine: `import { SectionCard } from "@olympusoss/canvas";`,
		overview:
			"Card with a built-in header (title / subtitle / actions) and three content states — loading / error / empty — wired to props. Pass `padding={false}` for edge-to-edge content.",
		tokens: ["--card", "--card-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SectionCardDefault />,
				source: sectionCardDefaultSource,
				filename: "SectionCard.tsx",
			},
			{
				id: "with-header-actions",
				title: "With header actions",
				render: () => <SectionCardWithHeaderActions />,
				source: sectionCardWithHeaderActionsSource,
				filename: "SectionCard.tsx",
			},
			{
				id: "loading",
				title: "Loading",
				render: () => <SectionCardLoading />,
				source: sectionCardLoadingSource,
				filename: "SectionCard.tsx",
			},
			{
				id: "error",
				title: "Error",
				render: () => <SectionCardError />,
				source: sectionCardErrorSource,
				filename: "SectionCard.tsx",
			},
			{
				id: "empty",
				title: "Empty",
				render: () => <SectionCardEmpty />,
				source: sectionCardEmptySource,
				filename: "SectionCard.tsx",
			},
			{
				id: "no-padding",
				title: "No padding",
				render: () => <SectionCardNoPadding />,
				source: sectionCardNoPaddingSource,
				filename: "SectionCard.tsx",
			},
		],
	},
	"stat-card": {
		id: "stat-card",
		tier: "molecules",
		displayName: "StatCard",
		propsSource: "molecules/stat-card",
		importLine: `import { StatCard } from "@olympusoss/canvas";`,
		overview:
			"Single-stat card with an icon tile and a large value. Six color variants tint the icon background; pair multiples in a grid for KPI dashboards.",
		tokens: ["--primary", "--card", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <StatCardDefault />,
				source: statCardDefaultSource,
				filename: "StatCard.tsx",
			},
			{
				id: "colors",
				title: "Color variants",
				description: "primary / blue / purple / success / warning / destructive.",
				render: () => <StatCardColors />,
				source: statCardColorsSource,
				filename: "StatCard.tsx",
			},
			{
				id: "with-icon",
				title: "With icon",
				render: () => <StatCardWithIcon />,
				source: statCardWithIconSource,
				filename: "StatCard.tsx",
			},
			{
				id: "without-icon",
				title: "Without icon",
				render: () => <StatCardWithoutIcon />,
				source: statCardWithoutIconSource,
				filename: "StatCard.tsx",
			},
		],
	},
	"status-badge": {
		id: "status-badge",
		tier: "molecules",
		displayName: "StatusBadge",
		propsSource: "molecules/status-badge",
		importLine: `import { StatusBadge } from "@olympusoss/canvas";`,
		overview:
			"Pill badge with semantic status colours (success / warning / error / info / neutral) and an optional leading dot.",
		tokens: ["--muted", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <StatusBadgeDefault />,
				source: statusBadgeDefaultSource,
				filename: "StatusBadge.tsx",
			},
			{
				id: "variants",
				title: "Status variants",
				render: () => <StatusBadgeVariants />,
				source: statusBadgeVariantsSource,
				filename: "StatusBadge.tsx",
			},
			{
				id: "no-dot",
				title: "Without dot",
				render: () => <StatusBadgeNoDot />,
				source: statusBadgeNoDotSource,
				filename: "StatusBadge.tsx",
			},
		],
	},
	stepper: {
		id: "stepper",
		tier: "molecules",
		displayName: "Stepper",
		propsSource: "molecules/stepper",
		importLine: `import { Stepper } from "@olympusoss/canvas";`,
		overview:
			"Linear progress indicator for multi-step flows. Each step is `{ id, label, status, disabled? }` with status one of `pending` / `active` / `complete` / `error`.",
		tokens: ["--primary", "--destructive", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <StepperDefault />,
				source: stepperDefaultSource,
				filename: "Stepper.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <StepperOrientations />,
				source: stepperOrientationsSource,
				filename: "Stepper.tsx",
			},
			{
				id: "with-error-step",
				title: "With error step",
				render: () => <StepperWithErrorStep />,
				source: stepperWithErrorStepSource,
				filename: "Stepper.tsx",
			},
			{
				id: "clickable",
				title: "Clickable",
				render: () => <StepperClickable />,
				source: stepperClickableSource,
				filename: "Stepper.tsx",
			},
		],
	},
	table: {
		id: "table",
		tier: "molecules",
		displayName: "Table",
		propsSource: "molecules/table",
		importLine: `import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@olympusoss/canvas";`,
		overview:
			'Semantic HTML table with the canvas styling. Compose with TableHeader / TableBody / TableFooter and the `data-state="selected"` row attribute for selection highlighting.',
		tokens: ["--border", "--muted"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <TableDefault />,
				source: tableDefaultSource,
				filename: "Table.tsx",
			},
			{
				id: "with-caption",
				title: "With caption",
				render: () => <TableWithCaption />,
				source: tableWithCaptionSource,
				filename: "Table.tsx",
			},
			{
				id: "with-footer",
				title: "With footer",
				render: () => <TableWithFooter />,
				source: tableWithFooterSource,
				filename: "Table.tsx",
			},
			{
				id: "with-row-selection",
				title: "Row selection",
				render: () => <TableWithRowSelection />,
				source: tableWithRowSelectionSource,
				filename: "Table.tsx",
			},
		],
	},
	"toggle-group": {
		id: "toggle-group",
		tier: "molecules",
		displayName: "ToggleGroup",
		propsSource: "molecules/toggle-group",
		importLine: `import { ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";`,
		overview:
			'Wraps Radix\'s ToggleGroup. Pick `type="single"` for radio-like selection, `type="multiple"` for many-of-N. `variant` and `size` cascade to every item.',
		tokens: ["--accent", "--accent-foreground", "--input"],
		examples: [
			{
				id: "default",
				title: "Default (single)",
				render: () => <ToggleGroupDefault />,
				source: toggleGroupDefaultSource,
				filename: "ToggleGroup.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				render: () => <ToggleGroupVariants />,
				source: toggleGroupVariantsSource,
				filename: "ToggleGroup.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				render: () => <ToggleGroupSizes />,
				source: toggleGroupSizesSource,
				filename: "ToggleGroup.tsx",
			},
			{
				id: "multiple",
				title: "Multiple",
				render: () => <ToggleGroupMultiple />,
				source: toggleGroupMultipleSource,
				filename: "ToggleGroup.tsx",
			},
			{
				id: "with-icons",
				title: "With icons",
				render: () => <ToggleGroupWithIcons />,
				source: toggleGroupWithIconsSource,
				filename: "ToggleGroup.tsx",
			},
		],
	},
	tooltip: {
		id: "tooltip",
		tier: "molecules",
		displayName: "Tooltip",
		propsSource: "molecules/tooltip",
		importLine: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@olympusoss/canvas";`,
		overview:
			"Compound on top of Radix Tooltip. Wrap your interactive trigger; mount one `<TooltipProvider>` near the app root to share delay state across the tree.",
		tokens: ["--popover", "--popover-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <TooltipDefault />,
				source: tooltipDefaultSource,
				filename: "Tooltip.tsx",
			},
			{
				id: "sides",
				title: "Sides",
				description: "top / right / bottom / left.",
				render: () => <TooltipSides />,
				source: tooltipSidesSource,
				filename: "Tooltip.tsx",
			},
			{
				id: "delayed",
				title: "Delay",
				render: () => <TooltipDelayed />,
				source: tooltipDelayedSource,
				filename: "Tooltip.tsx",
			},
			{
				id: "disabled-trigger",
				title: "Disabled trigger",
				render: () => <TooltipDisabledTrigger />,
				source: tooltipDisabledTriggerSource,
				filename: "Tooltip.tsx",
			},
		],
	},

	"activity-item": {
		id: "activity-item",
		tier: "molecules",
		displayName: "ActivityItem",
		propsSource: "molecules/activity-item",
		importLine: `import { ActivityItem, ActivityFeed } from "@olympusoss/canvas";`,
		overview:
			"Audit-log row showing a bold subject, muted action, and optional timestamp. Wrap rows in `<ActivityFeed>` for automatic dividers. Pass `onClick` to make a row interactive.",
		tokens: ["--border", "--foreground", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ActivityItemDefault />,
				source: activityItemDefaultSource,
				filename: "ActivityItem.tsx",
			},
			{
				id: "with-avatar",
				title: "With avatar",
				render: () => <ActivityItemWithAvatar />,
				source: activityItemWithAvatarSource,
				filename: "ActivityItem.tsx",
			},
			{
				id: "clickable",
				title: "Clickable rows",
				render: () => <ActivityItemClickable />,
				source: activityItemClickableSource,
				filename: "ActivityItem.tsx",
			},
		],
	},
	"brand-lockup": {
		id: "brand-lockup",
		tier: "molecules",
		displayName: "BrandLockup",
		propsSource: "molecules/brand-lockup",
		importLine: `import { BrandLockup } from "@olympusoss/canvas";`,
		overview:
			"Logo + product wordmark lockup with optional subtitle. Three sizes: `sm` (sidebar collapsed), `md` (sidebar expanded), `lg` (hero). Pass `collapsed` to show only the logo.",
		tokens: ["--foreground", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <BrandLockupDefault />,
				source: brandLockupDefaultSource,
				filename: "BrandLockup.tsx",
			},
			{
				id: "collapsed",
				title: "Collapsed",
				description: "Logo only, no wordmark.",
				render: () => <BrandLockupCollapsed />,
				source: brandLockupCollapsedSource,
				filename: "BrandLockup.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "sm / md / lg.",
				render: () => <BrandLockupSizes />,
				source: brandLockupSizesSource,
				filename: "BrandLockup.tsx",
			},
		],
	},
	"notification-list": {
		id: "notification-list",
		tier: "molecules",
		displayName: "NotificationList",
		propsSource: "molecules/notification-list",
		propsDisplayNames: ["NotificationList", "NotificationItem"],
		importLine: `import { NotificationList, NotificationItem } from "@olympusoss/canvas";`,
		overview:
			"Notification dropdown with a header (title + count chip), scrollable body, and optional footer. Fill with `<NotificationItem>` rows. Each item supports icon tones, avatars, timestamps, and click handlers.",
		tokens: [
			"--popover",
			"--popover-foreground",
			"--border",
			"--muted",
			"--stat-destructive",
			"--stat-blue",
			"--stat-success",
			"--stat-amber",
		],
		examples: [
			{
				id: "default",
				title: "Default list",
				render: () => <NotificationListDefault />,
				source: notificationListDefaultSource,
				filename: "NotificationList.tsx",
			},
			{
				id: "empty",
				title: "Empty state",
				render: () => <NotificationListEmpty />,
				source: notificationListEmptySource,
				filename: "NotificationList.tsx",
			},
			{
				id: "item-default",
				title: "Item with icon tones",
				render: () => <NotificationItemDefault />,
				source: notificationItemDefaultSource,
				filename: "NotificationItem.tsx",
			},
			{
				id: "item-with-avatar",
				title: "Item with avatar",
				description: "Avatar fallback in the icon slot.",
				render: () => <NotificationItemWithAvatar />,
				source: notificationItemWithAvatarSource,
				filename: "NotificationItem.tsx",
			},
			{
				id: "item-without-timestamp",
				title: "Item without timestamp",
				render: () => <NotificationItemWithoutTimestamp />,
				source: notificationItemWithoutTimestampSource,
				filename: "NotificationItem.tsx",
			},
		],
	},
	"number-badge": {
		id: "number-badge",
		tier: "molecules",
		displayName: "NumberBadge",
		propsSource: "molecules/number-badge",
		importLine: `import { NumberBadge } from "@olympusoss/canvas";`,
		overview:
			"Small overlay count badge for icon buttons (bell, inbox). Position absolutely against a `relative` parent. Counts above `max` (default 99) render as `99+`. Pass `dot` for a minimal indicator.",
		tokens: ["--destructive", "--primary", "--muted"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <NumberBadgeDefault />,
				source: numberBadgeDefaultSource,
				filename: "NumberBadge.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "Count, overflow, dot, muted tone.",
				render: () => <NumberBadgeVariants />,
				source: numberBadgeVariantsSource,
				filename: "NumberBadge.tsx",
			},
		],
	},
	"activity-heatmap": {
		id: "activity-heatmap",
		tier: "charts",
		displayName: "ActivityHeatmap",
		propsSource: "charts/activity-heatmap",
		importLine: `import { ActivityHeatmap } from "@olympusoss/canvas";`,
		overview:
			"CSS-grid heatmap of opacity-tinted cells. For time-of-day × day-of-week activity matrices (token issuance, sign-in concentration, queue depth) where a full chart is overkill.",
		tokens: ["--chart-1"],
		examples: [
			{
				id: "default",
				title: "Token issuance",
				render: () => <ActivityHeatmapDefault />,
				source: activityHeatmapDefaultSource,
				filename: "ActivityHeatmap.tsx",
			},
			{
				id: "week",
				title: "Weekly view with row labels",
				description: "7 rows × 24 hours with day-of-week labels alongside the grid.",
				render: () => <ActivityHeatmapWeek />,
				source: activityHeatmapWeekSource,
				filename: "ActivityHeatmap.tsx",
			},
			{
				id: "dense",
				title: "Yearly contribution graph",
				description: "52 columns × 7 rows of compact cells.",
				render: () => <ActivityHeatmapDense />,
				source: activityHeatmapDenseSource,
				filename: "ActivityHeatmap.tsx",
			},
		],
	},
	gauge: {
		id: "gauge",
		tier: "charts",
		displayName: "Gauge",
		propsSource: "charts/gauge",
		importLine: `import { Gauge } from "@olympusoss/canvas";`,
		overview:
			"Single-arc circular gauge with a centered value label. For 0–100 metrics like adoption percentages, health scores, or completion ratios.",
		tokens: ["--chart-1", "--muted"],
		examples: [
			{
				id: "default",
				title: "MFA adoption",
				render: () => <GaugeDefault />,
				source: gaugeDefaultSource,
				filename: "Gauge.tsx",
			},
			{
				id: "custom-label",
				title: "Custom valueLabel",
				description:
					"Replace the default percentage with a custom node — e.g. a value-of-total ratio.",
				render: () => <GaugeCustomLabel />,
				source: gaugeCustomLabelSource,
				filename: "Gauge.tsx",
			},
			{
				id: "colors",
				title: "Color variants",
				description: "Three thresholds rendered with different `colorVar` tokens.",
				render: () => <GaugeColors />,
				source: gaugeColorsSource,
				filename: "Gauge.tsx",
			},
		],
	},
	"labeled-bar-list": {
		id: "labeled-bar-list",
		tier: "charts",
		displayName: "LabeledBarList",
		propsSource: "charts/labeled-bar-list",
		importLine: `import { LabeledBarList } from "@olympusoss/canvas";`,
		overview:
			"Vertical list of labeled rows with a horizontal progress bar per row. Useful for top-N lists like top regions, schema usage, provider connections — anywhere a small set of named values needs proportional comparison without a full chart.",
		tokens: ["--chart-1", "--muted", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Top regions",
				render: () => <LabeledBarListDefault />,
				source: labeledBarListDefaultSource,
				filename: "LabeledBarList.tsx",
			},
			{
				id: "no-leading",
				title: "Schema usage (no leading slot)",
				description: "Drop the `leading` slot when there's nothing icon-like to show.",
				render: () => <LabeledBarListNoLeading />,
				source: labeledBarListNoLeadingSource,
				filename: "LabeledBarList.tsx",
			},
			{
				id: "storage",
				title: "Storage with custom valueFormatter",
				description:
					"Custom `valueFormatter` renders human-readable units alongside `<Icon />` leading slots.",
				render: () => <LabeledBarListStorage />,
				source: labeledBarListStorageSource,
				filename: "LabeledBarList.tsx",
			},
		],
	},
	"service-health-list": {
		id: "service-health-list",
		tier: "charts",
		displayName: "ServiceHealthList",
		propsSource: "charts/service-health-list",
		importLine: `import { ServiceHealthList } from "@olympusoss/canvas";`,
		overview:
			"Vertical list of services with a colored status dot, name, and optional monospace meta cells (latency, uptime, region). Drop-in for service-status panels.",
		tokens: ["--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ServiceHealthListDefault />,
				source: serviceHealthListDefaultSource,
				filename: "ServiceHealthList.tsx",
			},
			{
				id: "all-healthy",
				title: "All systems normal",
				description: "Every service `healthy` — useful for the steady-state status panel.",
				render: () => <ServiceHealthListAllHealthy />,
				source: serviceHealthListAllHealthySource,
				filename: "ServiceHealthList.tsx",
			},
			{
				id: "minimal",
				title: "Without meta cells",
				description: "Drop `meta` for compact sidebars or tight status drawers.",
				render: () => <ServiceHealthListMinimal />,
				source: serviceHealthListMinimalSource,
				filename: "ServiceHealthList.tsx",
			},
		],
	},
	sparkline: {
		id: "sparkline",
		tier: "molecules",
		displayName: "Sparkline",
		propsSource: "molecules/sparkline",
		importLine: `import { Sparkline } from "@olympusoss/canvas";`,
		overview:
			"Pure-CSS mini bar chart for inline embedding in `<StatCard>` or `<SectionCard>`. Decorative only; for interactive data use `<BarChart>` from the charts tier.",
		tokens: ["--chart-1", "--stat-success", "--stat-purple", "--stat-destructive"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SparklineDefault />,
				source: sparklineDefaultSource,
				filename: "Sparkline.tsx",
			},
			{
				id: "color-variants",
				title: "Color variants",
				description: "Different colorVar values.",
				render: () => <SparklineColorVariants />,
				source: sparklineColorVariantsSource,
				filename: "Sparkline.tsx",
			},
			{
				id: "inline",
				title: "Inline with StatCard",
				render: () => <SparklineInline />,
				source: sparklineInlineSource,
				filename: "Sparkline.tsx",
			},
		],
	},
	"stacked-bar": {
		id: "stacked-bar",
		tier: "charts",
		displayName: "StackedBar",
		propsSource: "charts/stacked-bar",
		importLine: `import { StackedBar } from "@olympusoss/canvas";`,
		overview:
			"Horizontal stacked-percent bar with an optional swatch legend. Pass raw counts or pre-computed percentages — segments size proportionally to the sum.",
		tokens: [
			"--chart-1",
			"--chart-2",
			"--chart-3",
			"--chart-4",
			"--chart-5",
			"--chart-6",
			"--muted",
		],
		examples: [
			{
				id: "default",
				title: "Sign-in methods",
				render: () => <StackedBarDefault />,
				source: stackedBarDefaultSource,
				filename: "StackedBar.tsx",
			},
			{
				id: "raw-counts",
				title: "Raw counts with formatter",
				description: "Pass raw counts and use `valueFormatter` to render thousands separators.",
				render: () => <StackedBarRawCounts />,
				source: stackedBarRawCountsSource,
				filename: "StackedBar.tsx",
			},
			{
				id: "no-legend",
				title: "Without legend",
				description: "Drop the legend with `showLegend={false}` for compact layouts.",
				render: () => <StackedBarNoLegend />,
				source: stackedBarNoLegendSource,
				filename: "StackedBar.tsx",
			},
		],
	},
	"user-avatar-chip": {
		id: "user-avatar-chip",
		tier: "molecules",
		displayName: "UserAvatarChip",
		propsSource: "molecules/user-avatar-chip",
		importLine: `import { UserAvatarChip } from "@olympusoss/canvas";`,
		overview:
			"Pill-shaped button chip showing a user avatar with name, optional email, and a dropdown chevron. Use in headers and menus. Pass `collapsed` to show only the avatar.",
		tokens: ["--border", "--card", "--foreground", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <UserAvatarChipDefault />,
				source: userAvatarChipDefaultSource,
				filename: "UserAvatarChip.tsx",
			},
			{
				id: "with-email",
				title: "With email",
				render: () => <UserAvatarChipWithEmail />,
				source: userAvatarChipWithEmailSource,
				filename: "UserAvatarChip.tsx",
			},
			{
				id: "collapsed",
				title: "Collapsed",
				description: "Avatar only, no name or chevron.",
				render: () => <UserAvatarChipCollapsed />,
				source: userAvatarChipCollapsedSource,
				filename: "UserAvatarChip.tsx",
			},
		],
	},

	// =========================================================================
	// ORGANISMS
	// =========================================================================
	"code-editor": {
		id: "code-editor",
		tier: "organisms",
		displayName: "CodeEditor",
		propsSource: "organisms/editors/code-editor",
		importLine: `import { CodeEditor } from "@olympusoss/canvas";`,
		overview:
			"Source-code editor backed by CodeMirror 6. Pick a language with the `language` prop; the wrapper loads the matching syntax highlighter and applies canvas-themed colours.",
		tokens: ["--input", "--ring", "--background"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CodeEditorDefault />,
				source: codeEditorDefaultSource,
				filename: "CodeEditor.tsx",
			},
		],
	},
	"markdown-editor": {
		id: "markdown-editor",
		tier: "organisms",
		displayName: "MarkdownEditor",
		propsSource: "organisms/editors/markdown-editor",
		importLine: `import { MarkdownEditor } from "@olympusoss/canvas";`,
		overview:
			"Markdown editor backed by CodeMirror 6 with syntax highlighting, a canvas-styled formatting toolbar, and an optional side-by-side preview pane.",
		tokens: ["--input", "--ring", "--background"],
		examples: [
			{
				id: "default",
				title: "Default with preview",
				render: () => <MarkdownEditorDefault />,
				source: markdownEditorDefaultSource,
				filename: "MarkdownEditor.tsx",
			},
		],
	},
	"rich-text-editor": {
		id: "rich-text-editor",
		tier: "organisms",
		displayName: "RichTextEditor",
		propsSource: "organisms/editors/rich-text-editor",
		importLine: `import { RichTextEditor } from "@olympusoss/canvas";`,
		overview:
			"Rich text editor backed by Tiptap (ProseMirror). Ships with bold, italic, strike, code, lists, blockquotes, code blocks, links, and heading levels. Outputs HTML or JSON.",
		tokens: ["--input", "--ring", "--background"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <RichTextEditorDefault />,
				source: richTextEditorDefaultSource,
				filename: "RichTextEditor.tsx",
			},
		],
	},
	accordion: {
		id: "accordion",
		tier: "organisms",
		displayName: "Accordion",
		propsSource: "organisms/accordion",
		importLine: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@olympusoss/canvas";`,
		overview:
			'Vertically stacked, expandable content. `type="single"` (default) collapses on re-click when `collapsible` is set; `type="multiple"` allows independent open/close.',
		tokens: ["--border", "--accent"],
		examples: [
			{
				id: "default",
				title: "Default (single)",
				render: () => <AccordionDefault />,
				source: accordionDefaultSource,
				filename: "Accordion.tsx",
			},
			{
				id: "multiple",
				title: "Multiple",
				render: () => <AccordionMultiple />,
				source: accordionMultipleSource,
				filename: "Accordion.tsx",
			},
			{
				id: "default-open",
				title: "Default open",
				render: () => <AccordionDefaultOpen />,
				source: accordionDefaultOpenSource,
				filename: "Accordion.tsx",
			},
			{
				id: "disabled-item",
				title: "Disabled item",
				render: () => <AccordionDisabledItem />,
				source: accordionDisabledItemSource,
				filename: "Accordion.tsx",
			},
		],
	},
	"alert-dialog": {
		id: "alert-dialog",
		tier: "organisms",
		displayName: "AlertDialog",
		propsSource: "organisms/alert-dialog",
		importLine: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@olympusoss/canvas";`,
		overview:
			"Modal confirm/cancel dialog for destructive or significant actions. Use over `Dialog` when the user must explicitly accept or reject — focus is trapped and Escape only fires `Cancel`.",
		tokens: ["--background", "--destructive", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AlertDialogDefault />,
				source: alertDialogDefaultSource,
				filename: "AlertDialog.tsx",
			},
			{
				id: "destructive",
				title: "Destructive",
				render: () => <AlertDialogDestructive />,
				source: alertDialogDestructiveSource,
				filename: "AlertDialog.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <AlertDialogControlled />,
				source: alertDialogControlledSource,
				filename: "AlertDialog.tsx",
			},
		],
	},
	carousel: {
		id: "carousel",
		tier: "organisms",
		displayName: "Carousel",
		propsSource: "organisms/carousel",
		importLine: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@olympusoss/canvas";`,
		overview:
			"Horizontal or vertical slider built on Embla. Pass `opts` for Embla options (loop, align, dragFree); read state via `setApi`.",
		tokens: ["--background", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CarouselDefault />,
				source: carouselDefaultSource,
				filename: "Carousel.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <CarouselOrientations />,
				source: carouselOrientationsSource,
				filename: "Carousel.tsx",
			},
			{
				id: "with-pagination",
				title: "With pagination",
				render: () => <CarouselWithPagination />,
				source: carouselWithPaginationSource,
				filename: "Carousel.tsx",
			},
			{
				id: "loop",
				title: "Loop",
				render: () => <CarouselLoop />,
				source: carouselLoopSource,
				filename: "Carousel.tsx",
			},
		],
	},
	"line-chart": {
		id: "line-chart",
		tier: "charts",
		displayName: "LineChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["LineChart"],
		importLine: `import { CartesianGrid, ChartContainer, ChartTooltip, ChartTooltipContent, Line, LineChart, XAxis, YAxis } from "@olympusoss/canvas";`,
		overview:
			"Line chart for trends and time-series data. Wrap data primitives in a `<ChartContainer>` for canvas theming; `<Line>` auto-cycles through `--chart-1`…`--chart-5` when no `stroke` is set.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <LineChartDefault />,
				source: lineChartDefaultSource,
				filename: "LineChart.tsx",
			},
			{
				id: "multi-series",
				title: "Multi-series",
				description: "Three lines, auto-coloured by canvas's chart palette.",
				render: () => <LineChartMultiSeries />,
				source: lineChartMultiSeriesSource,
				filename: "LineChart.tsx",
			},
			{
				id: "time-series",
				title: "Time series",
				description: "ISO date strings on the x-axis with a custom `tickFormatter`.",
				render: () => <LineChartTimeSeries />,
				source: lineChartTimeSeriesSource,
				filename: "LineChart.tsx",
			},
			{
				id: "curve-types",
				title: "Curve types",
				description: '`type="linear"`, `"monotone"`, `"step"` for different shapes.',
				render: () => <LineChartCurveTypes />,
				source: lineChartCurveTypesSource,
				filename: "LineChart.tsx",
			},
			{
				id: "with-reference",
				title: "With reference line",
				description: "Annotate thresholds with `<ReferenceLine>`.",
				render: () => <LineChartWithReference />,
				source: lineChartWithReferenceSource,
				filename: "LineChart.tsx",
			},
			{
				id: "with-brush",
				title: "With brush (zoom / pan)",
				description: "Drag the brush handle to zoom into a window of the dataset.",
				render: () => <LineChartWithBrush />,
				source: lineChartWithBrushSource,
				filename: "LineChart.tsx",
			},
		],
	},
	"bar-chart": {
		id: "bar-chart",
		tier: "charts",
		displayName: "BarChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["BarChart"],
		importLine: `import { Bar, BarChart, CartesianGrid, ChartContainer, ChartTooltip, ChartTooltipContent, XAxis, YAxis } from "@olympusoss/canvas";`,
		overview:
			"Bar chart for categorical comparison. `<Bar>` defaults to `--chart-N` colours; pass `stackId` for stacked bars.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <BarChartDefault />,
				source: barChartDefaultSource,
				filename: "BarChart.tsx",
			},
			{
				id: "multi-series",
				title: "Multi-series",
				render: () => <BarChartMultiSeries />,
				source: barChartMultiSeriesSource,
				filename: "BarChart.tsx",
			},
			{
				id: "stacked",
				title: "Stacked",
				description: "Share `stackId` to stack series.",
				render: () => <BarChartStacked />,
				source: barChartStackedSource,
				filename: "BarChart.tsx",
			},
			{
				id: "horizontal",
				title: "Horizontal",
				description: '`layout="vertical"` flips the orientation; the category axis becomes Y.',
				render: () => <BarChartHorizontal />,
				source: barChartHorizontalSource,
				filename: "BarChart.tsx",
			},
			{
				id: "with-labels",
				title: "With value labels",
				description: "`<LabelList>` paints each bar's value above it.",
				render: () => <BarChartWithLabels />,
				source: barChartWithLabelsSource,
				filename: "BarChart.tsx",
			},
		],
	},
	"area-chart": {
		id: "area-chart",
		tier: "charts",
		displayName: "AreaChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["AreaChart"],
		importLine: `import { Area, AreaChart, CartesianGrid, ChartContainer, ChartTooltip, ChartTooltipContent, XAxis, YAxis } from "@olympusoss/canvas";`,
		overview:
			"Filled line chart for cumulative metrics or time-series with volume. `<Area>` defaults to a 30%-opacity fill in the next palette colour.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AreaChartDefault />,
				source: areaChartDefaultSource,
				filename: "AreaChart.tsx",
			},
			{
				id: "stacked",
				title: "Stacked areas",
				description: "Layered, stacked-area composition.",
				render: () => <AreaChartStacked />,
				source: areaChartStackedSource,
				filename: "AreaChart.tsx",
			},
			{
				id: "gradient",
				title: "Gradient fill",
				description: "Top-to-bottom gradient via an inline `<linearGradient>` def.",
				render: () => <AreaChartGradient />,
				source: areaChartGradientSource,
				filename: "AreaChart.tsx",
			},
			{
				id: "curve-types",
				title: "Curve types",
				description: "Switch the path interpolation with `type`.",
				render: () => <AreaChartCurveTypes />,
				source: areaChartCurveTypesSource,
				filename: "AreaChart.tsx",
			},
		],
	},
	"pie-chart": {
		id: "pie-chart",
		tier: "charts",
		displayName: "PieChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["PieChart"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, Pie, PieChart } from "@olympusoss/canvas";`,
		overview:
			"Part-to-whole composition. `<Pie>` slices auto-cycle through the chart palette; pass `innerRadius` for a doughnut.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PieChartDefault />,
				source: pieChartDefaultSource,
				filename: "PieChart.tsx",
			},
			{
				id: "donut",
				title: "Donut",
				description: "Same primitive — pass `innerRadius`.",
				render: () => <PieChartDonut />,
				source: pieChartDonutSource,
				filename: "PieChart.tsx",
			},
			{
				id: "with-labels",
				title: "With slice labels",
				description: "Inline labels via the `label` render prop + `<LabelList>`.",
				render: () => <PieChartWithLabels />,
				source: pieChartWithLabelsSource,
				filename: "PieChart.tsx",
			},
			{
				id: "half-pie",
				title: "Half pie",
				description: 'Half-circle ring — `startAngle={180}` to `endAngle={0}` plus `cy="80%"`.',
				render: () => <PieChartHalfPie />,
				source: pieChartHalfPieSource,
				filename: "PieChart.tsx",
			},
		],
	},
	"scatter-chart": {
		id: "scatter-chart",
		tier: "charts",
		displayName: "ScatterChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["ScatterChart"],
		importLine: `import { CartesianGrid, ChartContainer, ChartTooltip, ChartTooltipContent, Scatter, ScatterChart, XAxis, YAxis } from "@olympusoss/canvas";`,
		overview:
			'Two-dimensional correlation. Pass `type="number"` on both axes; the `<Scatter>` data items auto-cycle through the palette.',
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ScatterChartDefault />,
				source: scatterChartDefaultSource,
				filename: "ScatterChart.tsx",
			},
			{
				id: "multi-series",
				title: "Multi-series",
				description: "Two scatter sets, auto-coloured.",
				render: () => <ScatterChartMultiSeries />,
				source: scatterChartMultiSeriesSource,
				filename: "ScatterChart.tsx",
			},
			{
				id: "bubble",
				title: "Bubble (Z axis)",
				description: "`<ZAxis>` with a `range` makes the dot size encode a third dimension.",
				render: () => <ScatterChartBubble />,
				source: scatterChartBubbleSource,
				filename: "ScatterChart.tsx",
			},
		],
	},
	"radar-chart": {
		id: "radar-chart",
		tier: "charts",
		displayName: "RadarChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["RadarChart"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "@olympusoss/canvas";`,
		overview:
			"Multi-axis profile chart. Use `<PolarAngleAxis>` for axis labels and `<Radar>` for the data shape.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <RadarChartDefault />,
				source: radarChartDefaultSource,
				filename: "RadarChart.tsx",
			},
			{
				id: "multi-series",
				title: "Multi-series",
				description: "Two radars over the same axis labels — useful for comparison views.",
				render: () => <RadarChartMultiSeries />,
				source: radarChartMultiSeriesSource,
				filename: "RadarChart.tsx",
			},
		],
	},
	"radial-bar-chart": {
		id: "radial-bar-chart",
		tier: "charts",
		displayName: "RadialBarChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["RadialBarChart"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, RadialBar, RadialBarChart } from "@olympusoss/canvas";`,
		overview: "Bars laid out around a circle — good for progress / completion dashboards.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <RadialBarChartDefault />,
				source: radialBarChartDefaultSource,
				filename: "RadialBarChart.tsx",
			},
		],
	},
	"composed-chart": {
		id: "composed-chart",
		tier: "charts",
		displayName: "ComposedChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["ComposedChart"],
		importLine: `import { Area, Bar, ChartContainer, ChartTooltip, ChartTooltipContent, ComposedChart, Line, XAxis, YAxis } from "@olympusoss/canvas";`,
		overview:
			"Mix `<Area>`, `<Bar>`, `<Line>` (and others) on the same canvas. Useful when one metric is a count, another is a rate.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ComposedChartDefault />,
				source: composedChartDefaultSource,
				filename: "ComposedChart.tsx",
			},
			{
				id: "dual-axis",
				title: "Dual Y axis",
				description:
					"Two `<YAxis>` with different `yAxisId` values — bars on the left axis, the rate line on the right.",
				render: () => <ComposedChartDualAxis />,
				source: composedChartDualAxisSource,
				filename: "ComposedChart.tsx",
			},
		],
	},
	"funnel-chart": {
		id: "funnel-chart",
		tier: "charts",
		displayName: "FunnelChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["FunnelChart"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, Funnel, FunnelChart, LabelList } from "@olympusoss/canvas";`,
		overview:
			"Conversion-funnel chart. Each `<Funnel>` datum needs a `fill` colour (canvas chart palette tokens recommended).",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <FunnelChartDefault />,
				source: funnelChartDefaultSource,
				filename: "FunnelChart.tsx",
			},
		],
	},
	treemap: {
		id: "treemap",
		tier: "charts",
		displayName: "Treemap",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["Treemap"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, Treemap } from "@olympusoss/canvas";`,
		overview:
			"Hierarchical area chart. Each leaf's area is proportional to its `dataKey` value; supply `fill` per leaf for colour.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <TreemapDefault />,
				source: treemapDefaultSource,
				filename: "Treemap.tsx",
			},
		],
	},
	sankey: {
		id: "sankey",
		tier: "charts",
		displayName: "Sankey",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["Sankey"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, Sankey } from "@olympusoss/canvas";`,
		overview:
			"Flow diagram with weighted source→target links. Pass `data={{ nodes, links }}` and configure `link`/`node` styling props.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SankeyDefault />,
				source: sankeyDefaultSource,
				filename: "Sankey.tsx",
			},
		],
	},
	"sunburst-chart": {
		id: "sunburst-chart",
		tier: "charts",
		displayName: "SunburstChart",
		propsSource: "charts/chart-types",
		propsDisplayNames: ["SunburstChart"],
		importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent, SunburstChart } from "@olympusoss/canvas";`,
		overview:
			"Radial hierarchy chart. `data` is a tree of `{ name, value, children?, fill? }` nodes — recharts does NOT auto-aggregate, so every node needs an explicit `value`. Per-node `fill` controls sector colour; without it the recharts default (`#333`) is used.",
		tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SunburstChartDefault />,
				source: sunburstChartDefaultSource,
				filename: "SunburstChart.tsx",
			},
			{
				id: "deep-hierarchy",
				title: "Deep hierarchy",
				description:
					"Three levels of nested children — each branch keeps one hue with progressively lighter opacity per ring (1.0 / 0.65 / 0.4) so depth reads without introducing more colours.",
				render: () => <SunburstChartHalfCircle />,
				source: sunburstChartHalfCircleSource,
				filename: "SunburstChart.tsx",
			},
		],
	},
	"world-heat-map": {
		id: "world-heat-map",
		tier: "charts",
		displayName: "WorldHeatMap",
		propsSource: "charts/world-heat-map",
		propsDisplayNames: ["WorldHeatMap"],
		importLine: `import { WorldHeatMap } from "@olympusoss/canvas";\nimport "@olympusoss/canvas/styles/leaflet.css"; // once at app entry`,
		overview:
			"Leaflet-based geographic heat-map. Renders three concentric markers per point — outer glow, main dot (with tooltip), bright centre — sized by `count` on a log scale. Tile basemap follows the canvas theme by default; switch with `tileTheme`. **Peer-optional**: install `leaflet` and `react-leaflet` in your app. The component itself never lands in canvas's main bundle (lazy-loaded chunk) so apps that don't use it don't pay the bundle cost.",
		tokens: [
			"--chart-1",
			"--chart-2",
			"--chart-3",
			"--chart-4",
			"--chart-5",
			"--popover",
			"--border",
			"--muted-foreground",
		],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <WorldHeatMapDefault />,
				source: worldHeatMapDefaultSource,
				filename: "WorldHeatMap.tsx",
			},
			{
				id: "with-title-and-legend",
				title: "With title and legend",
				render: () => <WorldHeatMapWithTitleAndLegend />,
				source: worldHeatMapWithTitleAndLegendSource,
				filename: "WorldHeatMap.tsx",
			},
			{
				id: "light-theme",
				title: "Light theme",
				render: () => <WorldHeatMapLightTheme />,
				source: worldHeatMapLightThemeSource,
				filename: "WorldHeatMap.tsx",
			},
			{
				id: "empty",
				title: "Empty state",
				render: () => <WorldHeatMapEmpty />,
				source: worldHeatMapEmptySource,
				filename: "WorldHeatMap.tsx",
			},
			{
				id: "custom-marker",
				title: "Custom marker",
				render: () => <WorldHeatMapCustomMarker />,
				source: worldHeatMapCustomMarkerSource,
				filename: "WorldHeatMap.tsx",
			},
			{
				id: "with-click-handler",
				title: "With click handler",
				render: () => <WorldHeatMapWithClickHandler />,
				source: worldHeatMapWithClickHandlerSource,
				filename: "WorldHeatMap.tsx",
			},
		],
	},
	collapsible: {
		id: "collapsible",
		tier: "organisms",
		displayName: "Collapsible",
		propsSource: "organisms/collapsible",
		importLine: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@olympusoss/canvas";`,
		overview: "Single-section show/hide. Lighter than Accordion — no item state, just open/closed.",
		tokens: ["--background"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CollapsibleDefault />,
				source: collapsibleDefaultSource,
				filename: "Collapsible.tsx",
			},
			{
				id: "default-open",
				title: "Default open",
				render: () => <CollapsibleDefaultOpen />,
				source: collapsibleDefaultOpenSource,
				filename: "Collapsible.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <CollapsibleControlled />,
				source: collapsibleControlledSource,
				filename: "Collapsible.tsx",
			},
		],
	},
	command: {
		id: "command",
		tier: "organisms",
		displayName: "Command",
		propsSource: "organisms/command",
		importLine: `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@olympusoss/canvas";`,
		overview:
			"Spotlight-style command palette built on `cmdk`. Compose with `Command` (or `CommandDialog` for the modal version), an `Input`, grouped `Items`, and an `Empty` fallback.",
		tokens: ["--popover", "--popover-foreground", "--accent"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <CommandDefault />,
				source: commandDefaultSource,
				filename: "Command.tsx",
			},
			{
				id: "dialog",
				title: "Command dialog (⌘K)",
				render: () => <CommandDialogEx />,
				source: commandDialogSource,
				filename: "Command.tsx",
			},
			{
				id: "with-groups",
				title: "With groups",
				render: () => <CommandWithGroups />,
				source: commandWithGroupsSource,
				filename: "Command.tsx",
			},
			{
				id: "with-shortcuts",
				title: "With shortcuts",
				render: () => <CommandWithShortcuts />,
				source: commandWithShortcutsSource,
				filename: "Command.tsx",
			},
			{
				id: "empty-state",
				title: "Empty state",
				render: () => <CommandEmptyState />,
				source: commandEmptyStateSource,
				filename: "Command.tsx",
			},
		],
	},
	"context-menu": {
		id: "context-menu",
		tier: "organisms",
		displayName: "ContextMenu",
		propsSource: "organisms/context-menu",
		importLine: `import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@olympusoss/canvas";`,
		overview:
			"Right-click menu over Radix's ContextMenu. Same shape as `DropdownMenu` (items, separators, sub-menus, checkboxes, radios) — just triggered by the contextmenu event.",
		tokens: ["--popover", "--popover-foreground", "--accent"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ContextMenuDefault />,
				source: contextMenuDefaultSource,
				filename: "ContextMenu.tsx",
			},
			{
				id: "with-submenu",
				title: "With submenu",
				render: () => <ContextMenuWithSubmenu />,
				source: contextMenuWithSubmenuSource,
				filename: "ContextMenu.tsx",
			},
			{
				id: "with-checkboxes",
				title: "With checkboxes",
				render: () => <ContextMenuWithCheckboxes />,
				source: contextMenuWithCheckboxesSource,
				filename: "ContextMenu.tsx",
			},
			{
				id: "with-radio-group",
				title: "With radio group",
				render: () => <ContextMenuWithRadioGroup />,
				source: contextMenuWithRadioGroupSource,
				filename: "ContextMenu.tsx",
			},
			{
				id: "inset-items",
				title: "Inset items",
				render: () => <ContextMenuInsetItems />,
				source: contextMenuInsetItemsSource,
				filename: "ContextMenu.tsx",
			},
		],
	},
	"data-table": {
		id: "data-table",
		tier: "organisms",
		displayName: "DataTable",
		propsSource: "organisms/data-table",
		importLine: `import { DataTable } from "@olympusoss/canvas";`,
		overview:
			"Generic table over TanStack Table. Pass `columns` (legacy `field`/`renderCell` or TanStack `accessorKey`/`cell` style) and `data`. Toggle `searchable`, `pagination`, and `selectable` to grow the surface.",
		tokens: ["--border", "--muted"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <DataTableDefault />,
				source: dataTableDefaultSource,
				filename: "DataTable.tsx",
			},
			{
				id: "with-search",
				title: "With search",
				render: () => <DataTableWithSearch />,
				source: dataTableWithSearchSource,
				filename: "DataTable.tsx",
			},
			{
				id: "with-pagination",
				title: "With pagination",
				render: () => <DataTableWithPagination />,
				source: dataTableWithPaginationSource,
				filename: "DataTable.tsx",
			},
			{
				id: "with-selection",
				title: "With selection",
				render: () => <DataTableWithSelection />,
				source: dataTableWithSelectionSource,
				filename: "DataTable.tsx",
			},
			{
				id: "loading",
				title: "Loading",
				render: () => <DataTableLoading />,
				source: dataTableLoadingSource,
				filename: "DataTable.tsx",
			},
			{
				id: "empty",
				title: "Empty",
				render: () => <DataTableEmpty />,
				source: dataTableEmptySource,
				filename: "DataTable.tsx",
			},
			{
				id: "with-add-button",
				title: "With + button",
				render: () => <DataTableWithAddButton />,
				source: dataTableWithAddButtonSource,
				filename: "DataTable.tsx",
			},
			{
				id: "with-refresh",
				title: "With refresh",
				render: () => <DataTableWithRefresh />,
				source: dataTableWithRefreshSource,
				filename: "DataTable.tsx",
			},
			{
				id: "controlled-search",
				title: "Controlled search",
				render: () => <DataTableControlledSearch />,
				source: dataTableControlledSearchSource,
				filename: "DataTable.tsx",
			},
			{
				id: "controlled-selection",
				title: "Controlled selection",
				render: () => <DataTableControlledSelection />,
				source: dataTableControlledSelectionSource,
				filename: "DataTable.tsx",
			},
			{
				id: "custom-page-size",
				title: "Custom page size",
				render: () => <DataTableCustomPageSize />,
				source: dataTableCustomPageSizeSource,
				filename: "DataTable.tsx",
			},
		],
	},
	dialog: {
		id: "dialog",
		tier: "organisms",
		displayName: "Dialog",
		propsSource: "organisms/dialog",
		importLine: `import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@olympusoss/canvas";`,
		overview:
			"General-purpose modal. Wrap a `DialogTrigger` button + a `DialogContent` body. For confirm/cancel flows prefer `<AlertDialog>`.",
		tokens: ["--background", "--popover", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <DialogDefault />,
				source: dialogDefaultSource,
				filename: "Dialog.tsx",
			},
			{
				id: "form-inside",
				title: "Form inside",
				render: () => <DialogFormInside />,
				source: dialogFormInsideSource,
				filename: "Dialog.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <DialogControlled />,
				source: dialogControlledSource,
				filename: "Dialog.tsx",
			},
			{
				id: "nested",
				title: "Nested",
				render: () => <DialogNested />,
				source: dialogNestedSource,
				filename: "Dialog.tsx",
			},
			{
				id: "scrollable-content",
				title: "Scrollable content",
				render: () => <DialogScrollableContent />,
				source: dialogScrollableContentSource,
				filename: "Dialog.tsx",
			},
		],
	},
	drawer: {
		id: "drawer",
		tier: "organisms",
		displayName: "Drawer",
		propsSource: "organisms/drawer",
		importLine: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@olympusoss/canvas";`,
		overview:
			"Bottom-sheet style modal built on `vaul` — supports drag-to-dismiss, snap points, nested stacks, and four edge directions.",
		tokens: ["--background", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <DrawerDefault />,
				source: drawerDefaultSource,
				filename: "Drawer.tsx",
			},
			{
				id: "directions",
				title: "Directions",
				render: () => <DrawerDirections />,
				source: drawerDirectionsSource,
				filename: "Drawer.tsx",
			},
			{
				id: "with-snap-points",
				title: "With snap points",
				render: () => <DrawerWithSnapPoints />,
				source: drawerWithSnapPointsSource,
				filename: "Drawer.tsx",
			},
			{
				id: "nested",
				title: "Nested",
				render: () => <DrawerNested />,
				source: drawerNestedSource,
				filename: "Drawer.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <DrawerControlled />,
				source: drawerControlledSource,
				filename: "Drawer.tsx",
			},
		],
	},
	"dropdown-menu": {
		id: "dropdown-menu",
		tier: "organisms",
		displayName: "DropdownMenu",
		propsSource: "organisms/dropdown-menu",
		importLine: `import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@olympusoss/canvas";`,
		overview:
			"Click-triggered dropdown over Radix's DropdownMenu. Items can be plain, checkbox, radio, or sub-menu triggers.",
		tokens: ["--popover", "--popover-foreground", "--accent"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <DropdownMenuDefault />,
				source: dropdownMenuDefaultSource,
				filename: "DropdownMenu.tsx",
			},
			{
				id: "with-submenu",
				title: "With submenu",
				render: () => <DropdownMenuWithSubmenu />,
				source: dropdownMenuWithSubmenuSource,
				filename: "DropdownMenu.tsx",
			},
			{
				id: "with-checkboxes",
				title: "With checkboxes",
				render: () => <DropdownMenuWithCheckboxes />,
				source: dropdownMenuWithCheckboxesSource,
				filename: "DropdownMenu.tsx",
			},
			{
				id: "with-radio-group",
				title: "With radio group",
				render: () => <DropdownMenuWithRadioGroup />,
				source: dropdownMenuWithRadioGroupSource,
				filename: "DropdownMenu.tsx",
			},
			{
				id: "with-shortcuts",
				title: "With shortcuts",
				render: () => <DropdownMenuWithShortcuts />,
				source: dropdownMenuWithShortcutsSource,
				filename: "DropdownMenu.tsx",
			},
			{
				id: "inset-items",
				title: "Inset items",
				render: () => <DropdownMenuInsetItems />,
				source: dropdownMenuInsetItemsSource,
				filename: "DropdownMenu.tsx",
			},
		],
	},
	"error-boundary": {
		id: "error-boundary",
		tier: "organisms",
		displayName: "ErrorBoundary",
		propsSource: "organisms/error-boundary",
		importLine: `import { ErrorBoundary } from "@olympusoss/canvas";`,
		overview:
			"Class-based React error boundary. Catches render errors in `children`, shows a built-in fallback (or custom one via the `fallback` render prop), and exposes `reset()` for retry.",
		tokens: ["--destructive"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ErrorBoundaryDefault />,
				source: errorBoundaryDefaultSource,
				filename: "ErrorBoundary.tsx",
			},
			{
				id: "custom-fallback",
				title: "Custom fallback",
				render: () => <ErrorBoundaryCustomFallback />,
				source: errorBoundaryCustomFallbackSource,
				filename: "ErrorBoundary.tsx",
			},
		],
	},
	form: {
		id: "form",
		tier: "organisms",
		displayName: "Form",
		propsSource: "organisms/form",
		importLine: `import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@olympusoss/canvas";`,
		overview:
			"Adaptor over `react-hook-form`. `Form` is the provider; `FormField` controls a single field (passes `field`/`fieldState`); `FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage` lay it out with built-in error wiring.",
		tokens: ["--destructive", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <FormDefault />,
				source: formDefaultSource,
				filename: "Form.tsx",
			},
			{
				id: "with-validation",
				title: "With validation",
				render: () => <FormWithValidation />,
				source: formWithValidationSource,
				filename: "Form.tsx",
			},
			{
				id: "multi-field",
				title: "Multi-field",
				render: () => <FormMultiField />,
				source: formMultiFieldSource,
				filename: "Form.tsx",
			},
			{
				id: "with-field-array",
				title: "With field array",
				render: () => <FormWithFieldArray />,
				source: formWithFieldArraySource,
				filename: "Form.tsx",
			},
			{
				id: "disabled-field",
				title: "Disabled field",
				render: () => <FormDisabledField />,
				source: formDisabledFieldSource,
				filename: "Form.tsx",
			},
		],
	},
	"hover-card": {
		id: "hover-card",
		tier: "organisms",
		displayName: "HoverCard",
		propsSource: "organisms/hover-card",
		importLine: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@olympusoss/canvas";`,
		overview:
			"Tooltip-like preview that opens on hover. Heavier than `Tooltip` — meant for rich previews (avatar, bio, link card).",
		tokens: ["--popover", "--popover-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <HoverCardDefault />,
				source: hoverCardDefaultSource,
				filename: "HoverCard.tsx",
			},
			{
				id: "with-image",
				title: "With image",
				render: () => <HoverCardWithImage />,
				source: hoverCardWithImageSource,
				filename: "HoverCard.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <HoverCardControlled />,
				source: hoverCardControlledSource,
				filename: "HoverCard.tsx",
			},
			{
				id: "delayed-open",
				title: "Open delay",
				render: () => <HoverCardDelayedOpen />,
				source: hoverCardDelayedOpenSource,
				filename: "HoverCard.tsx",
			},
		],
	},
	menubar: {
		id: "menubar",
		tier: "organisms",
		displayName: "Menubar",
		propsSource: "organisms/menubar",
		importLine: `import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@olympusoss/canvas";`,
		overview:
			"Persistent top menu (File / Edit / View). Each `MenubarMenu` opens its own dropdown; supports the same item kinds as `DropdownMenu`.",
		tokens: ["--accent", "--accent-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <MenubarDefault />,
				source: menubarDefaultSource,
				filename: "Menubar.tsx",
			},
			{
				id: "with-shortcuts",
				title: "With shortcuts",
				render: () => <MenubarWithShortcuts />,
				source: menubarWithShortcutsSource,
				filename: "Menubar.tsx",
			},
			{
				id: "with-submenu",
				title: "With submenu",
				render: () => <MenubarWithSubmenu />,
				source: menubarWithSubmenuSource,
				filename: "Menubar.tsx",
			},
			{
				id: "with-checkboxes",
				title: "With checkboxes",
				render: () => <MenubarWithCheckboxes />,
				source: menubarWithCheckboxesSource,
				filename: "Menubar.tsx",
			},
		],
	},
	navbar: {
		id: "navbar",
		tier: "organisms",
		displayName: "NavBar",
		propsSource: "organisms/navbar",
		importLine: `import { NavBar } from "@olympusoss/canvas";`,
		overview:
			"Marketing/app top bar. Pass `logo`, `links`, and an `actions` slot. `sticky` (default) pins to the top with a backdrop blur. Override the link element via `linkComponent` to integrate Next.js / React Router.",
		tokens: ["--background", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <NavBarDefault />,
				source: navBarDefaultSource,
				filename: "NavBar.tsx",
			},
			{
				id: "sticky",
				title: "Sticky",
				render: () => <NavBarSticky />,
				source: navBarStickySource,
				filename: "NavBar.tsx",
			},
			{
				id: "with-actions",
				title: "With actions",
				render: () => <NavBarWithActions />,
				source: navBarWithActionsSource,
				filename: "NavBar.tsx",
			},
			{
				id: "mobile-menu",
				title: "Mobile menu",
				render: () => <NavBarMobileMenu />,
				source: navBarMobileMenuSource,
				filename: "NavBar.tsx",
			},
		],
	},
	"navigation-menu": {
		id: "navigation-menu",
		tier: "organisms",
		displayName: "NavigationMenu",
		propsSource: "organisms/navigation-menu",
		importLine: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@olympusoss/canvas";`,
		overview:
			"Marketing-style nav with mega-menu support. Items can be plain `NavigationMenuLink`s or `NavigationMenuTrigger`s that open a `NavigationMenuContent` panel.",
		tokens: ["--popover", "--accent"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <NavigationMenuDefault />,
				source: navigationMenuDefaultSource,
				filename: "NavigationMenu.tsx",
			},
			{
				id: "with-dropdowns",
				title: "With dropdowns",
				render: () => <NavigationMenuWithDropdowns />,
				source: navigationMenuWithDropdownsSource,
				filename: "NavigationMenu.tsx",
			},
			{
				id: "with-grid-content",
				title: "Grid content",
				render: () => <NavigationMenuWithGridContent />,
				source: navigationMenuWithGridContentSource,
				filename: "NavigationMenu.tsx",
			},
		],
	},
	popover: {
		id: "popover",
		tier: "organisms",
		displayName: "Popover",
		propsSource: "organisms/popover",
		importLine: `import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@olympusoss/canvas";`,
		overview:
			"Floating panel anchored to a trigger. Use `PopoverAnchor` to anchor to a different element than the trigger button.",
		tokens: ["--popover", "--popover-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <PopoverDefault />,
				source: popoverDefaultSource,
				filename: "Popover.tsx",
			},
			{
				id: "form-inside",
				title: "Form inside",
				render: () => <PopoverFormInside />,
				source: popoverFormInsideSource,
				filename: "Popover.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <PopoverControlled />,
				source: popoverControlledSource,
				filename: "Popover.tsx",
			},
			{
				id: "with-anchor",
				title: "With anchor",
				render: () => <PopoverWithAnchor />,
				source: popoverWithAnchorSource,
				filename: "Popover.tsx",
			},
		],
	},
	resizable: {
		id: "resizable",
		tier: "organisms",
		displayName: "Resizable",
		propsSource: "organisms/resizable",
		importLine: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";`,
		overview:
			"Split-pane layout over `react-resizable-panels`. `ResizablePanelGroup` direction picks horizontal vs vertical; `ResizableHandle` separates panels.",
		tokens: ["--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ResizableDefault />,
				source: resizableDefaultSource,
				filename: "Resizable.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <ResizableOrientations />,
				source: resizableOrientationsSource,
				filename: "Resizable.tsx",
			},
			{
				id: "with-handle",
				title: "With handle grip",
				render: () => <ResizableWithHandle />,
				source: resizableWithHandleSource,
				filename: "Resizable.tsx",
			},
			{
				id: "nested-panels",
				title: "Nested panels",
				render: () => <ResizableNestedPanels />,
				source: resizableNestedPanelsSource,
				filename: "Resizable.tsx",
			},
			{
				id: "default-sizes",
				title: "Default sizes",
				render: () => <ResizableDefaultSizes />,
				source: resizableDefaultSizesSource,
				filename: "Resizable.tsx",
			},
		],
	},
	"schema-form": {
		id: "schema-form",
		tier: "organisms",
		displayName: "SchemaForm",
		propsSource: "organisms/schema-form",
		importLine: `import { SchemaForm, type RJSFSchema, type UiSchema } from "@olympusoss/canvas";`,
		overview:
			"JSON-Schema-driven form built on RJSF + ajv8. Pass `schema` for shape and `uiSchema` for widget hints. Comes pre-wired with canvas-styled widgets (text/email/password/select/textarea).",
		tokens: ["--input", "--ring", "--destructive"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SchemaFormDefault />,
				source: schemaFormDefaultSource,
				filename: "SchemaForm.tsx",
			},
			{
				id: "with-ui-schema",
				title: "With ui:schema",
				render: () => <SchemaFormWithUiSchema />,
				source: schemaFormWithUiSchemaSource,
				filename: "SchemaForm.tsx",
			},
			{
				id: "with-validation",
				title: "With validation",
				render: () => <SchemaFormWithValidation />,
				source: schemaFormWithValidationSource,
				filename: "SchemaForm.tsx",
			},
			{
				id: "nested-schema",
				title: "Nested schema",
				render: () => <SchemaFormNestedSchema />,
				source: schemaFormNestedSchemaSource,
				filename: "SchemaForm.tsx",
			},
			{
				id: "array-field",
				title: "Array field",
				render: () => <SchemaFormArrayField />,
				source: schemaFormArrayFieldSource,
				filename: "SchemaForm.tsx",
			},
		],
	},
	select: {
		id: "select",
		tier: "organisms",
		displayName: "Select",
		propsSource: "organisms/select",
		importLine: `import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@olympusoss/canvas";`,
		overview:
			"Dropdown picker over Radix's Select. Use `SelectGroup` + `SelectLabel` for sectioned lists.",
		tokens: ["--popover", "--accent", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SelectDefault />,
				source: selectDefaultSource,
				filename: "Select.tsx",
			},
			{
				id: "with-groups",
				title: "With groups",
				render: () => <SelectWithGroups />,
				source: selectWithGroupsSource,
				filename: "Select.tsx",
			},
			{
				id: "with-icons-in-items",
				title: "With icons",
				render: () => <SelectWithIconsInItems />,
				source: selectWithIconsInItemsSource,
				filename: "Select.tsx",
			},
			{
				id: "disabled",
				title: "Disabled",
				render: () => <SelectDisabled />,
				source: selectDisabledSource,
				filename: "Select.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <SelectControlled />,
				source: selectControlledSource,
				filename: "Select.tsx",
			},
		],
	},
	sheet: {
		id: "sheet",
		tier: "organisms",
		displayName: "Sheet",
		propsSource: "organisms/sheet",
		importLine: `import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@olympusoss/canvas";`,
		overview:
			"Edge-anchored slide-out modal. Pick a `side` on `SheetContent` to choose top/right/bottom/left.",
		tokens: ["--background", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SheetDefault />,
				source: sheetDefaultSource,
				filename: "Sheet.tsx",
			},
			{
				id: "sides",
				title: "Sides",
				render: () => <SheetSides />,
				source: sheetSidesSource,
				filename: "Sheet.tsx",
			},
			{
				id: "form-inside",
				title: "Form inside",
				render: () => <SheetFormInside />,
				source: sheetFormInsideSource,
				filename: "Sheet.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <SheetControlled />,
				source: sheetControlledSource,
				filename: "Sheet.tsx",
			},
		],
	},
	sidebar: {
		id: "sidebar",
		tier: "organisms",
		displayName: "Sidebar",
		propsSource: "organisms/sidebar",
		importLine: `import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar } from "@olympusoss/canvas";`,
		overview:
			"Full app-shell sidebar with collapse modes (`offcanvas`, `icon`, `none`), three visual variants (`sidebar`, `floating`, `inset`), and 22 sub-components. Always wrap your app in `<SidebarProvider>`.",
		tokens: ["--sidebar", "--sidebar-foreground", "--sidebar-accent", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SidebarDefault />,
				source: sidebarDefaultSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "side-right",
				title: "Side: right",
				render: () => <SidebarSideRight />,
				source: sidebarSideRightSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				render: () => <SidebarVariants />,
				source: sidebarVariantsSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "collapsible-icon",
				title: "collapsible=icon",
				render: () => <SidebarCollapsibleIcon />,
				source: sidebarCollapsibleIconSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "collapsible-offcanvas",
				title: "collapsible=offcanvas",
				render: () => <SidebarCollapsibleOffcanvas />,
				source: sidebarCollapsibleOffcanvasSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "with-groups",
				title: "With groups",
				render: () => <SidebarWithGroups />,
				source: sidebarWithGroupsSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "with-active-item",
				title: "With active item",
				render: () => <SidebarWithActiveItem />,
				source: sidebarWithActiveItemSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "with-actions",
				title: "With menu actions",
				render: () => <SidebarWithActions />,
				source: sidebarWithActionsSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "with-skeleton",
				title: "With skeleton",
				render: () => <SidebarWithSkeleton />,
				source: sidebarWithSkeletonSource,
				filename: "Sidebar.tsx",
			},
			{
				id: "athena-pattern",
				title: "Athena admin pattern",
				description:
					"Data-driven sidebar mirroring `OlympusOSS/athena`'s local `Sidebar.tsx` — one config array of grouped items with per-item `iconColor`, tooltips on the collapsed rail, an active matcher, and a footer with user chip + logout. Use this as the migration target for replacing the hand-rolled component in athena.",
				render: () => <SidebarAthenaPattern />,
				source: sidebarAthenaPatternSource,
				filename: "Sidebar.tsx",
			},
		],
	},
	sonner: {
		id: "sonner",
		tier: "organisms",
		displayName: "Toaster",
		propsSource: "organisms/sonner",
		importLine: `import { Toaster, toast } from "@olympusoss/canvas";`,
		overview:
			"Toast notifications via `sonner`. Mount `<Toaster />` once near the app root; trigger toasts imperatively with `toast(…)`, `toast.success`, `toast.error`, `toast.warning`, `toast.info`, `toast.promise`.",
		tokens: ["--popover", "--popover-foreground", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <SonnerDefault />,
				source: sonnerDefaultSource,
				filename: "Toaster.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				render: () => <SonnerVariants />,
				source: sonnerVariantsSource,
				filename: "Toaster.tsx",
			},
			{
				id: "with-action",
				title: "With action",
				render: () => <SonnerWithAction />,
				source: sonnerWithActionSource,
				filename: "Toaster.tsx",
			},
			{
				id: "promise",
				title: "Promise",
				render: () => <SonnerPromise />,
				source: sonnerPromiseSource,
				filename: "Toaster.tsx",
			},
			{
				id: "position",
				title: "Position",
				render: () => <SonnerPosition />,
				source: sonnerPositionSource,
				filename: "Toaster.tsx",
			},
		],
	},
	tabs: {
		id: "tabs",
		tier: "organisms",
		displayName: "Tabs",
		propsSource: "organisms/tabs",
		importLine: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";`,
		overview:
			"Standard tab strip over Radix Tabs. Either uncontrolled (`defaultValue`) or controlled (`value` + `onValueChange`). Supports horizontal and vertical orientations.",
		tokens: ["--background", "--accent", "--muted-foreground"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <TabsDefault />,
				source: tabsDefaultSource,
				filename: "Tabs.tsx",
			},
			{
				id: "controlled",
				title: "Controlled",
				render: () => <TabsControlled />,
				source: tabsControlledSource,
				filename: "Tabs.tsx",
			},
			{
				id: "orientations",
				title: "Orientations",
				render: () => <TabsOrientations />,
				source: tabsOrientationsSource,
				filename: "Tabs.tsx",
			},
			{
				id: "with-icons",
				title: "With icons",
				render: () => <TabsWithIcons />,
				source: tabsWithIconsSource,
				filename: "Tabs.tsx",
			},
			{
				id: "disabled-tab",
				title: "Disabled tab",
				render: () => <TabsDisabledTab />,
				source: tabsDisabledTabSource,
				filename: "Tabs.tsx",
			},
		],
	},
	"theme-provider": {
		id: "theme-provider",
		tier: "organisms",
		displayName: "ThemeProvider",
		propsSource: "organisms/theme-provider",
		importLine: `import { ThemeProvider, useTheme } from "@olympusoss/canvas";`,
		overview:
			"Light/dark theme context. Wraps your app root and writes the active theme class on `<html>`. Pair with `useTheme()` to read or change the theme in any descendant.",
		tokens: [],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ThemeProviderDefault />,
				source: themeProviderDefaultSource,
				filename: "ThemeProvider.tsx",
			},
			{
				id: "system-theme",
				title: "System default",
				render: () => <ThemeProviderSystem />,
				source: themeProviderSystemSource,
				filename: "ThemeProvider.tsx",
			},
		],
	},

	// =========================================================================
	// TEMPLATES
	// =========================================================================
	"app-header": {
		id: "app-header",
		tier: "templates",
		displayName: "AppHeader",
		propsSource: "templates/app-header",
		importLine: `import { AppHeader } from "@olympusoss/canvas";`,
		overview:
			"Top-level admin header bar with slots for search, action buttons, user chip, and a mobile menu trigger. Sticky by default.",
		tokens: ["--border", "--background"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AppHeaderDefault />,
				source: appHeaderDefaultSource,
				filename: "AppHeader.tsx",
			},
			{
				id: "minimal",
				title: "Minimal",
				description: "User chip only, no search or actions.",
				render: () => <AppHeaderMinimal />,
				source: appHeaderMinimalSource,
				filename: "AppHeader.tsx",
			},
			{
				id: "with-mobile-menu",
				title: "With mobile menu",
				description: "Hamburger trigger for AdminShell's mobile drawer.",
				render: () => <AppHeaderWithMobileMenu />,
				source: appHeaderWithMobileMenuSource,
				filename: "AppHeader.tsx",
			},
		],
	},
	"admin-shell": {
		id: "admin-shell",
		tier: "templates",
		displayName: "AdminShell",
		propsSource: "templates/admin-shell",
		importLine: `import { AdminShell } from "@olympusoss/canvas";`,
		overview:
			"Two-column admin layout with collapsible sidebar (renders as a fixed left column on md+, drawer on mobile). Pass any sidebar element — atoms-level `Sidebar` or your own.",
		tokens: ["--sidebar", "--background", "--border"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <AdminShellDefault />,
				source: adminShellDefaultSource,
				filename: "AdminShell.tsx",
			},
			{
				id: "sidebar-collapsed",
				title: "Sidebar collapsed",
				render: () => <AdminShellSidebarCollapsed />,
				source: adminShellSidebarCollapsedSource,
				filename: "AdminShell.tsx",
			},
			{
				id: "with-breadcrumbs",
				title: "With breadcrumbs",
				render: () => <AdminShellWithBreadcrumbs />,
				source: adminShellWithBreadcrumbsSource,
				filename: "AdminShell.tsx",
			},
		],
	},
	"auth-layout": {
		id: "auth-layout",
		tier: "templates",
		displayName: "AuthLayout",
		propsSource: "templates/auth-layout",
		importLine: `import { AuthLayout } from "@olympusoss/canvas";`,
		overview:
			"⚠️ DEPRECATED — use AuthShell instead. AuthLayout is the v1 centered-card auth scaffold; it remains exported as a backwards-compatibility alias and will be removed in canvas v3.0.",
		tokens: [],
	},
	"auth-shell": {
		id: "auth-shell",
		tier: "templates",
		displayName: "AuthShell",
		propsSource: "templates/auth-shell",
		importLine: `import { AuthShell } from "@olympusoss/canvas";`,
		overview:
			"Centered card auth scaffold with brand header (Olympus logo by default), title/subtitle, optional decorative background, and footer slot.",
		tokens: ["--background", "--card", "--border"],
		examples: [
			{
				id: "default",
				title: "Sign in",
				render: () => <AuthShellDefault />,
				source: authShellDefaultSource,
				filename: "AuthShell.tsx",
			},
			{
				id: "signup",
				title: "Sign up",
				render: () => <AuthShellSignup />,
				source: authShellSignupSource,
				filename: "AuthShell.tsx",
			},
			{
				id: "with-error",
				title: "With error",
				render: () => <AuthShellWithError />,
				source: authShellWithErrorSource,
				filename: "AuthShell.tsx",
			},
			{
				id: "with-otp-flow",
				title: "OTP flow",
				render: () => <AuthShellWithOtpFlow />,
				source: authShellWithOtpFlowSource,
				filename: "AuthShell.tsx",
			},
		],
	},
	"wizard-shell": {
		id: "wizard-shell",
		tier: "templates",
		displayName: "WizardShell",
		propsSource: "templates/wizard-shell",
		importLine: `import { WizardShell } from "@olympusoss/canvas";`,
		overview:
			"Multi-step layout with a left-side `Stepper`, a main content area, and an optional bottom `ActionBar` for next/back navigation.",
		tokens: ["--background", "--border", "--primary"],
		examples: [
			{
				id: "default",
				title: "Default (3 steps)",
				render: () => <WizardShellDefault />,
				source: wizardShellDefaultSource,
				filename: "WizardShell.tsx",
			},
			{
				id: "5-step",
				title: "5-step wizard",
				render: () => <WizardShellFiveStep />,
				source: wizardShellFiveStepSource,
				filename: "WizardShell.tsx",
			},
			{
				id: "with-validation",
				title: "With validation",
				render: () => <WizardShellWithValidation />,
				source: wizardShellWithValidationSource,
				filename: "WizardShell.tsx",
			},
		],
	},
};
