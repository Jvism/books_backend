import bcrypt from 'bcrypt'

export const crypt = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, 10)
}
