// 获取环境变量
const ENV = import.meta.env

interface configKey {
  [key: string]: string
}

// 配置文件
let config: configKey = {}

// 默认配置文件
const configSource: object = {
  appCode: ENV.VITE_APP_CODE,
  // 项目标识代码
  projectCode: `${ENV.VITE_APP_CODE}_${ENV.VITE_APP_ENV}`,
  // 项目名称
  projectName: ENV.VITE_APP_NAME,
  // 项目描述
  projectDesc: ENV.VITE_APP_DESCRIPTION,
  // 资源base地址
  base: ENV.VITE_BASE,
  // 接口代理 URL 路径
  baseUrl: ENV.VITE_BASE_URL,
  // 模拟数据接口路径
  mockBaseUrl: ENV.VITE_BASE_MOCK_URL,
  // 服务器接口路径
  serverBaseUrl: ENV.VITE_BASE_SERVER_URL
}
const setConfig = ( cfg : object ): object => {
  config = Object.assign(config, cfg)
  return config
}

const resetConfig = (): object => {
  config = { ...configSource }
  return config
}

resetConfig()

const getConfig = (key?: string[] | string ) => {
  if (typeof key === 'string') {
    const arr: string[] = key.split('.')

    if (arr && arr.length) {
      let data: {} | string = config

      arr.forEach(v  => {
        if (data && typeof config[v] !== 'undefined') {
          data = config[v]
        } else {
          data = ''
        }
      })
      
      return data
    }
  }
  if (Array.isArray(key)) {
    const data = config

    if (key && key.length > 1) {
      let res: configKey = {}

      key.forEach(v => {
        if (data && typeof data[v] !== 'undefined') {
          res[v] = data[v]
        } else {
          res[v] = ''
        }
      })

      return res
    }
    
    return data
  }
  return { ...config }
}

export { getConfig, setConfig, resetConfig }