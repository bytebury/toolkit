import type { Brand } from "./utility_types.ts";

/**
 * Represents a duration of time in milliseconds. You should
 * always use this type when working with durations of time in milliseconds.
 * It helps ensure that you're working with durations of time in milliseconds,
 * and not accidentally using a different unit of time.
 *
 * @example
 * ```ts
 * setTimeout(() => {}, 1_000 as Milliseconds);
 * ```
 */
export type Milliseconds = Brand<number, "milliseconds">;
/** Represents a duration of time in seconds. */
export type Seconds = Brand<number, "seconds">;
/** Represents a duration of time in minutes. */
export type Minutes = Brand<number, "minutes">;
/** Represents a duration of time in hours. */
export type Hours = Brand<number, "hours">;
/** Represents a duration of time in days. */
export type Days = Brand<number, "days">;
/** Represents a duration of time in weeks. */
export type Weeks = Brand<number, "weeks">;
/** Represents a duration of time in years. */
export type Years = Brand<number, "years">;

/**
 * Sleeps for the given duration of milliseconds.
 *
 * @example Using `sleep` directly (for milliseconds).
 * ```ts
 * await sleep(1_000 as Milliseconds);
 * ```
 * @example Using `Duration.sleep` (for non-milliseconds).
 * ```ts
 * await Duration.seconds(1 as Seconds).sleep();
 * ```
 */
export const sleep = async (ms: Milliseconds): Promise<void> => {
  await Duration.milliseconds(ms).sleep();
};

/**
 * A representation of a duration of time within a codebase.
 * This class provides a way to work with durations of time in a type-safe manner.
 *
 * @see milliseconds to quickly create a millisecond duration.
 *
 * @example Converting seconds to milliseconds
 * ```ts
 * setTimeout(() => {}, Duration.seconds(1 as Seconds).toMilliseconds());
 * ```
 * @example Converting minutes to milliseconds
 * ```ts
 * setTimeout(() => {}, Duration.minutes(1 as Minutes).toMilliseconds());
 * ```
 * @example Converting to milliseconds
 */
export class Duration {
  private constructor(private readonly milliseconds: Milliseconds) {}

  /**
   * Creates a Duration from milliseconds.
   */
  static milliseconds(milliseconds: Milliseconds): Duration {
    return new Duration(milliseconds);
  }

  /**
   * Creates a Duration from seconds.
   */
  static seconds(seconds: Seconds): Duration {
    return new Duration(seconds * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from minutes.
   */
  static minutes(minutes: Minutes): Duration {
    return new Duration(minutes * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from hours.
   */
  static hours(hours: Hours): Duration {
    return new Duration(hours * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from days.
   */
  static days(days: Days): Duration {
    return new Duration(days * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from weeks.
   */
  static weeks(weeks: Weeks): Duration {
    return new Duration(weeks * 7 * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Creates a Duration from years.
   */
  static years(years: Years): Duration {
    return new Duration(years * 365 * 24 * 60 * 60 * 1000 as Milliseconds);
  }

  /**
   * Converts the duration to milliseconds.
   */
  toMilliseconds(): Milliseconds {
    return this.milliseconds;
  }

  /**
   * Converts the duration to seconds.
   */
  toSeconds(): Seconds {
    return this.milliseconds / 1000 as Seconds;
  }

  /**
   * Converts the duration to minutes.
   */
  toMinutes(): Minutes {
    return this.milliseconds / (60 * 1000) as Minutes;
  }

  /**
   * Converts the duration to hours.
   */
  toHours(): Hours {
    return this.milliseconds / (60 * 60 * 1000) as Hours;
  }

  /**
   * Converts the duration to days.
   */
  toDays(): Days {
    return this.milliseconds / (24 * 60 * 60 * 1000) as Days;
  }

  /**
   * Converts the duration to weeks.
   */
  toWeeks(): Weeks {
    return this.milliseconds / (7 * 24 * 60 * 60 * 1000) as Weeks;
  }

  /**
   * Converts the duration to years.
   */
  toYears(): Years {
    return this.milliseconds / (365 * 24 * 60 * 60 * 1000) as Years;
  }

  /**
   * Sleeps for the current duration.
   *
   * @example
   * ```ts
   * const duration = Duration.seconds(5);
   * await duration.sleep();
   * ```
   */
  async sleep(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.toMilliseconds()));
  }
}

/**
 * Converts milliseconds to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.milliseconds(milliseconds as Milliseconds).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * milliseconds(1000);
 * ```
 */
export function milliseconds(milliseconds: number): Milliseconds {
  return Duration.milliseconds(milliseconds as Milliseconds).toMilliseconds();
}


/**
 * Converts seconds to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.seconds(seconds as Seconds).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * seconds(60);
 * ```
 */
export function seconds(seconds: number): Milliseconds {
  return Duration.seconds(seconds as Seconds).toMilliseconds()
}

/**
 * Converts minutes to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.minutes(minutes as Minutes).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * minutes(1);
 * ```
 */
export function minutes(minutes: number): Milliseconds {
  return Duration.minutes(minutes as Minutes).toMilliseconds()
}

/**
 * Converts hours to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.hours(hours as Hours).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * hours(1);
 * ```
 */
export function hours(hours: number): Milliseconds {
  return Duration.hours(hours as Hours).toMilliseconds()
}

/**
 * Converts days to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.days(days as Days).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * days(1);
 * ```
 */
export function days(days: number): Milliseconds {
  return Duration.days(days as Days).toMilliseconds()
}


/**
 * Converts weeks to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.weeks(weeks as Weeks).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * weeks(1);
 * ```
 */
export function weeks(weeks: number): Milliseconds {
  return Duration.weeks(weeks as Weeks).toMilliseconds()
}


/**
 * Converts years to milliseconds. This is shorthand for the following:
 *
 * ```ts
 * Duration.years(years as Years).toMilliseconds();
 * ```
 *
 * @example
 * ```ts
 * years(1);
 * ```
 */
export function years(years: number): Milliseconds {
  return Duration.years(years as Years).toMilliseconds()
}