import autoprefixer from 'autoprefixer'
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

export default {
  plugins:[
		autoprefixer,
		postcssJitProps(OpenProps)
	]
}