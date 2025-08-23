import { faker } from "@faker-js/faker";
import { consola } from "consola";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { prisma } from "~/core/prisma";

/**
 * Faker Seed
 * */
faker.seed(0);

/**
 * Faking started...
 * */
consola.info("Faking started...");

// TODO: Implement faker data generation.
consola.info("Nothing to fake.");

/**
 * Faking completed.
 * */
consola.success("Faking completed.");
