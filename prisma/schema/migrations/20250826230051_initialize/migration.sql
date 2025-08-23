-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "email" VARCHAR NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "name" VARCHAR NOT NULL,
    "image" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "password" VARCHAR,
    "provider_id" VARCHAR NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "id_token" VARCHAR,
    "access_token" VARCHAR,
    "access_token_expires_at" TIMESTAMPTZ,
    "refresh_token" VARCHAR,
    "refresh_token_expires_at" TIMESTAMPTZ,
    "scope" VARCHAR,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "token" VARCHAR NOT NULL,
    "ip_address" VARCHAR,
    "user_agent" VARCHAR,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "identifier" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_profile" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "avatar_url" VARCHAR,
    "display_name" VARCHAR,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "public"."user_preferences" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "locale" VARCHAR NOT NULL,
    "timezone" VARCHAR NOT NULL,
    "first_day_of_week" SMALLINT NOT NULL,
    "accent_color" VARCHAR NOT NULL,
    "color_scheme" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "archived_at" TIMESTAMPTZ,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "permissions" VARCHAR,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles_on_users" (
    "role_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "active_from" TIMESTAMPTZ,
    "active_to" TIMESTAMPTZ,
    "note" VARCHAR
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_key" ON "public"."verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "verification_value_key" ON "public"."verification"("value");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "public"."user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "public"."user_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "public"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_on_users_role_id_user_id_key" ON "public"."roles_on_users"("role_id", "user_id");

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roles_on_users" ADD CONSTRAINT "roles_on_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roles_on_users" ADD CONSTRAINT "roles_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
