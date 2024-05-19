import { IGenerateCodeProvider } from '@application/user-exemple/application/ports/providers/IGenerateCodeProvider';




export class FakeIGenerateCodeProvider implements IGenerateCodeProvider {
  generate(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumbers = Math.floor(100 + Math.random() * 900).toString();
  
    return randomLetter + "" +randomNumbers;
    
  }

}
