/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "date_of_birth" DATE NOT NULL,
ADD COLUMN     "sex_id" CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "sex";

-- CreateTable
CREATE TABLE "Sex" (
    "id" CHAR(25) NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sex_name_key" ON "Sex"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sex_id_fkey" FOREIGN KEY ("sex_id") REFERENCES "Sex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
