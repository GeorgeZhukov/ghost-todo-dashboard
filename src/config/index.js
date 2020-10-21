import development from './development';
import production from './production';

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? production : development

export default config
