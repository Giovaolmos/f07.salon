// En el servicio de credenciales:

import { credentialModel } from "../../config/typeorm";
import { credentialDto } from "../../dtos/credentialDto";
import { Credential } from "../../entities/Credential";

export const createCredentialService = async (credential: credentialDto) => {
  const existingUser = await credentialModel.findOneBy({
    username: credential.username,
  });

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const newCredential: Credential = credentialModel.create(credential);
  return await credentialModel.save(newCredential);
};

export const validateCredential = async (
  validateCredential: credentialDto,
): Promise<Credential> => {
  const { username, password, role } = validateCredential;

  const credential = await credentialModel.findOneBy({ username });

  if (!credential) {
    throw new Error("Credenciales incorrectas");
  }

  if (password !== credential.password) {
    throw new Error("Credenciales incorrectas");
  }

  if (role !== credential.role) {
    throw new Error("Rol incorrecto");
  }

  return credential;
};
