-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "files" TEXT[],

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
