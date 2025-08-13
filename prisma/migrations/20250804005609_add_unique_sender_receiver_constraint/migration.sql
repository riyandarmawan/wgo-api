/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `friend_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friend_requests_senderId_receiverId_key" ON "public"."friend_requests"("senderId", "receiverId");
