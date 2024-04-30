-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "waiting_time" BOOLEAN NOT NULL DEFAULT false,
    "service" BOOLEAN NOT NULL DEFAULT false,
    "temperature" BOOLEAN NOT NULL DEFAULT false,
    "ingredient" BOOLEAN NOT NULL DEFAULT false,
    "flavor" BOOLEAN NOT NULL DEFAULT false,
    "presentation" BOOLEAN NOT NULL DEFAULT false,
    "inovation" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_cnpj_key" ON "restaurants"("cnpj");
