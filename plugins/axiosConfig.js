export default function ({ $axios, redirect }, inject) {
    const api = $axios.create({
        headers: {
            Accept: "application/json",
            "Accept-Language": 'en',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
        }
    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 400) {
            redirect('/pages/404');
        }
    });

    // handle errors
    api.onError(error => {
        $nuxt.$loading.finish();
    });

    api.onRequest(config => {
        $nuxt.$loading.start();
    });

    api.onResponse(response => {
        $nuxt.$loading.finish();
    });

    inject("api", api);
}
