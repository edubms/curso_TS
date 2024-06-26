import { iUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import { Inject, Injectable } from "@nestjs/common";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";

@Injectable()
export default class UpdateShelterDetailsUseCase implements iUseCase<UpdateShelterDetailsUseCaseInput,UpdateShelterDetailsUseCaseOutput>
{
    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
    ){}
    async run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        await this.shelterRepository.update(input);

        const shelter = await this.shelterRepository.get()

        return new UpdateShelterDetailsUseCaseOutput({
            name: shelter.name,
            email: shelter.email,
            phone: shelter.phone,
            whatsapp: shelter.whatsapp,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt,
        })
    }


}

