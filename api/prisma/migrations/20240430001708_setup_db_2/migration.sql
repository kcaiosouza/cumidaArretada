/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "reviews" (
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

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);
