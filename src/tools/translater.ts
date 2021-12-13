export const translate = async (text: string, lang: string) => {

    let formData = new FormData();
    formData.append('q', text);
    formData.append('source', "auto");
    formData.append('target', lang);
    formData.append('api_key', "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    try {
        let result: any = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: formData
        });

        result = await result.json();

        return result.translatedText;
    } catch (err) {
        console.log(err)
        return text;
    }
}