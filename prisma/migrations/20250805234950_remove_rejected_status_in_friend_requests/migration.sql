/*
  Warnings:

  - The values [REJECTED] on the enum `FriendRequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FriendRequestStatus_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TABLE "public"."friend_requests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."friend_requests" ALTER COLUMN "status" TYPE "public"."FriendRequestStatus_new" USING ("status"::text::"public"."FriendRequestStatus_new");
ALTER TYPE "public"."FriendRequestStatus" RENAME TO "FriendRequestStatus_old";
ALTER TYPE "public"."FriendRequestStatus_new" RENAME TO "FriendRequestStatus";
DROP TYPE "public"."FriendRequestStatus_old";
ALTER TABLE "public"."friend_requests" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
