import { createFromIconfontCN } from '@ant-design/icons'
import classnames from 'classnames'
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont'
import { iconFontUrl } from '@utils/common'
import styles from './style.module.less'

const InitIcon = createFromIconfontCN({
  scriptUrl: iconFontUrl,
})

const Icon = (props: { disabled?: boolean } & IconFontProps<string>) => {
  const { type, disabled, className, ...rest } = props
  return (
    <InitIcon
      type={type}
      className={classnames(className, { [styles.disabled]: disabled })}
      {...rest}
    />
  )
}

export default Icon
