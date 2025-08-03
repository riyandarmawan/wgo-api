/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_receiver_id_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "receiver_id";
