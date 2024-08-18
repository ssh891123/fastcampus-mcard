//type 정리를 위한 models 폴더 생성
export interface Card {
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export interface AdBanner {
  title: string
  description: string
  link: string
}
