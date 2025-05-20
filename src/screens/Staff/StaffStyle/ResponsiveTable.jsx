/**
 * ResponsiveTable - A wrapper component for making tables responsive
 *
 * Usage:
 * <ResponsiveTable>
 *   <table>...</table>
 * </ResponsiveTable>
 */
const ResponsiveTable = ({ children, className = "", ...props }) => {
  return (
    <div className={`table-responsive ${className}`} {...props}>
      {children}
    </div>
  )
}

export default ResponsiveTable
