-- CreateTable
CREATE TABLE "SpecificationsCars" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,

    CONSTRAINT "SpecificationsCars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "Specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
