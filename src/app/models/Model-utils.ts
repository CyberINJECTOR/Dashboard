export class ModelUtils {
    public static DeleteCharacter(chain: string, position: number): string {
        return chain.substring(position);
    }

    public static ConvertToUpperCase(chain: string): string {
        return chain.charAt(0).toUpperCase() + chain.slice(1);
    }
}